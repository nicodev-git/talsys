import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from 'sec-api';
import { Card, Row, Col } from 'antd';
import { searchSECByQuery } from 'client/actions/secActions';
import { SEC_KEY } from 'client/constants/config';

import './dashboard.css';

import CompanyTable from './CompanyTable'

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      pagination: {
        current: 1,
        pageSize: 10,
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
  }

  async componentDidMount() {
    await this.searchsecFilings()
    const socket = api(SEC_KEY);
    socket.on('filing', filing => console.log(filing));
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
      <div className="container-fluid">
        <Row className="w-100" gutter={16}>
          <Col span={6}>
            <Card
              style={{ width: "100%" }}
            >
              <Card.Meta title="Search & Filter" description="description ..." />
            </Card>
          </Col>
          <Col span={18}>
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
  searchSECByQuery
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)