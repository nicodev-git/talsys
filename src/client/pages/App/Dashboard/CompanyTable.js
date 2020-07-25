import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table, Tag, Space } from 'antd';


const columns = [
  {
    title: 'Filed At',
    dataIndex: 'filedAt',
    key: 'filedAt',
    render: (date) => new Date(date).toLocaleString()
  },
  {
    title: 'From Type',
    dataIndex: 'formType',
    key: 'formType',
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
    render: (cell, row) => row.entities[0].sic
  },
  {
    title: 'Company Name',
    key: 'companyName',
    dataIndex: 'companyName',
  },
  {
    title: 'Filing Details',
    key: 'linkToFilingDetails',
    dataIndex: 'linkToFilingDetails',
    render: (link) => <a href={link} target="_blank">{link}</a>
  },
  {
    title: 'TXT Version of Filing',
    key: 'linkToTxt',
    dataIndex: 'linkToTxt',
    render: (link) => <a href={link} target="_blank">{link}</a>
  },
  {
    title: 'Attachments',
    key: 'linkToHtml',
    dataIndex: 'linkToHtml',
    render: (link) => <a href={link} target="_blank">{link}</a>
  }
];


const CompanyTable = ({loading, pagination, onChange, dataSource}) => {
  console.log(dataSource)
  return (
    <Table 
      columns={columns} 
      rowKey={record => record.id}
      scroll={{ x: 1300 }}
      dataSource={dataSource} 
      pagination={pagination}
      loading={loading} 
      onChange={onChange}
    />
  );
}

export default CompanyTable