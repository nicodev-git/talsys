import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';
import './dashboard.css';

import CompanyTable from './CompanyTable'

export class Dashboard extends Component {

  render() {
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
            	<CompanyTable/>
           	</Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard