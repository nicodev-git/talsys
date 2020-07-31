import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'sec-api';
import { Card, Row, Col, notification, Form, Input, DatePicker, Select } from 'antd';
import { searchSECByQuery, addFilingUpdate } from 'client/actions/secActions';
import { upgradePayment } from 'client/actions/paymentActions';
import { SEC_KEY } from 'client/constants/config';
import StripeCheckout from 'client/pages/App/Upgrade';

import './dashboard.css';

import CompanyTable from './CompanyTable'
import FilterForm from './FilterForm'


export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pagination: {
        current: 1,
        pageSize: 10,
        company_cik_sic: null,
        date: null 
      },
      query: {
        "query": {
          "query_string": {
              "query": "formType:\"8-K\""
          }
        },
        "from": "0",
        "size": "10",
        "sort": [
            {
              "filedAt": {
                  "order": "desc"
              }
            }
        ]
      }
    };

    this.handleTableChange = this.handleTableChange.bind(this)
    this.searchsecFilings = this.searchsecFilings.bind(this)
    this.getSearchKey = this.getSearchKey.bind(this)
    this.onCardConfirm = this.onCardConfirm.bind(this)
  }

  async componentDidMount() {
    await this.searchsecFilings()
    const socket = api(SEC_KEY);
    socket.on('filing', filing => {
      if(filing.formType === '8-K'){
        this.props.addFilingUpdate(filing)

        console.log(filing)
        notification.info({
          message: `New Filing`,
          description: filing.description,
          placement: "bottomLeft"
        });
      }
    });
  }

  async searchsecFilings() {
    this.setState({ loading: true });
    try {
      await this.props.searchSECByQuery(this.state.query);
      this.setState({ loading: false });
    } catch(err) {
      // Handle auth error
      this.setState({ loading: false });
    }
  }

  getSearchKey(keys) {
    let query_string = "formType:\"8-K\""

    console.log(keys)
    if(keys.company) 
      query_string += ` AND (companyName:${keys.company} OR cik:${keys.company} OR entities.sic:${keys.company})`

    if(keys.date && keys.date.length === 2)
      query_string += ` AND filedAt:{${keys.date[0].format('YYYY-MM-DD')} TO ${keys.date[1].format('YYYY-MM-DD')}}`

    this.setState({
      query: {
        ...this.state.query,
        "query": {
          "query_string": {
              "query": query_string
          }
        },
        "from": (this.state.pagination.current-1)*this.state.pagination.pageSize,
        "size": this.state.pagination.pageSize
      }
    }, async () => {
      await this.searchsecFilings()
    })
  }

  onCardConfirm(data) {
    this.props.upgradePayment(data)
  }

  handleTableChange(pagination, filters, sorter) {
    this.setState({
      pagination: {current: pagination.current, pageSize: pagination.pageSize},
      query: {
        ...this.state.query,
        "from": (pagination.current-1)*pagination.pageSize,
        "size": pagination.pageSize
      }
    }, async () => {
      await this.searchsecFilings()
    })
  }

  render() {
    const {loading, pagination} = this.state
    const {secFilings} = this.props

    return (
      <div className="container-fluid dashboard-page">
        <Row gutter={16}>
          <Col lg={6}>
            <Card
              className="w-100 mb-4"
            >
              <Card.Meta title="Search & Filter"/>
                <FilterForm 
                  callback={
                    (keys) => this.getSearchKey(keys)
                  }
                />
                <StripeCheckout 
                  onCardConfirm={data => this.onCardConfirm(data)}/>
              </Card>
          </Col>
          <Col lg={18}>
          	<Card
              style={{ width: "100%" }}
            >
            	<CompanyTable 
                loading={loading}
                dataSource={secFilings && secFilings.filings}
                pagination={{
                  ...pagination, 
                  total: secFilings && secFilings.total.value || 10
                }}
                onChange={this.handleTableChange}
              />
           	</Card>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  secFilings: state.sec.secData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchSECByQuery,
  upgradePayment,
  addFilingUpdate
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)