import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment'
import api from 'sec-api';
import { Card, Row, Col, notification, Form, Input, DatePicker, Select } from 'antd';
import { searchSECByQuery, addFilingUpdate } from 'client/actions/secActions';
import { upgradePayment } from 'client/actions/paymentActions';
import { SEC_KEY } from 'client/constants/config';
import StripeCheckout from 'client/pages/App/Upgrade';

import './dashboard.css';

import CompanyTable from './CompanyTable'
import FilterForm from './FilterForm'


const INITIAL_QUERY = {
  "dateRange": "custom",
  "startdt": "2000-01-01",
  "enddt": moment(new Date()).format('YYYY-MM-DD'),
  "category": "all",
  "locationType": "located",
  "locationCode": "all",
  "forms": ["8-K"],
  "page": 1,
  "from": 0
}

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pagination: {
        current: 1,
        pageSize: 100
      },
      query: INITIAL_QUERY
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
      console.log(filing)
      if(filing.formType === '8-K'){
        this.props.addFilingUpdate(filing)

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
    let newQuery = Object.assign({}, this.state.query)

    if(keys.clear) {
      newQuery = INITIAL_QUERY
    } else {

      if(keys.entityName) 
        newQuery.entityName = keys.entityName

      if(keys.q){
        newQuery.q = keys.q
      }

      if(keys.daterange) {
        newQuery.startdt = keys.daterange[0].format('YYYY-MM-DD')
        newQuery.enddt = keys.daterange[1].format('YYYY-MM-DD')
      }

    }

    this.setState({
      query: newQuery
    }, async () => {
      await this.searchsecFilings()
    })
  }

  onCardConfirm(data) {
    this.props.upgradePayment(data)
  }

  // handleTableChange(pagination, filters, sorter) {
  //   this.setState({
  //     pagination: {current: pagination.current, pageSize: pagination.pageSize},
  //     query: {
  //       ...this.state.query,
  //       "from": (pagination.current-1)*pagination.pageSize,
  //       "page": pagination.current
  //     }
  //   }, async () => {
  //     await this.searchsecFilings()
  //   })
  // }

  handleTableChange(page) {
    this.setState({
      pagination: {current: page},
      query: {
        ...this.state.query,
        "from": (page-1)*100,
        "page": page
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
        <Row gutter={30}>
          <Col span={7}>
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
          <Col span={17}>
            <Card
              style={{ width: "100%" }}
            >
              <CompanyTable 
                loading={loading}
                searchWord={this.state.query.q}
                dataSource={secFilings && secFilings.hits.hits}
                pagination={{
                  ...pagination, 
                  total: secFilings && secFilings.hits.total.value || 100
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