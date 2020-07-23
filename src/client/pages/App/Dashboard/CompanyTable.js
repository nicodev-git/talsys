import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table, Tag, Space } from 'antd';


const columns = [
  {
    title: 'Filed At',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'From Type',
    dataIndex: 'form',
    key: 'form',
  },
  {
    title: 'CIK',
    dataIndex: 'cik',
    key: 'cik',
  },
  {
    title: 'SIC',
    key: 'sic',
    dataIndex: 'sic',
  },
  {
    title: 'Company Name',
    key: 'company',
    dataIndex: 'company',
  },
  {
    title: 'Filing Details',
    key: 'details',
    dataIndex: 'details',
  }
];

const data = [
  {
    key: '1',
    date: new Date().toLocaleString(),
    form: "8-K",
    cik: '111',
    sic: '111',
    company: 'SUN COMMUNITIES INC',
    details: 'details link',
  },
  {
    key: '2',
    date: new Date().toLocaleString(),
    form: "8-K",
    cik: '111',
    sic: '111',
    company: 'SUN COMMUNITIES INC',
    details: 'details link',
  },
  {
    key: '3',
    date: new Date().toLocaleString(),
    form: "8-K",
    cik: '111',
    sic: '111',
    company: 'SUN COMMUNITIES INC',
    details: 'details link',
  },
  {
    key: '4',
    date: new Date().toLocaleString(),
    form: "8-K",
    cik: '111',
    sic: '111',
    company: 'SUN COMMUNITIES INC',
    details: 'details link',
  },
];

const CompanyTable = () => {
  return (
    <Table columns={columns} dataSource={data} />
  );
}

export default CompanyTable