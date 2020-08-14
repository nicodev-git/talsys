import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table, Tag, Space, Modal, Button, Spin } from 'antd';
import { getFilingHtml } from 'client/actions/secActions';

const filing_basic_url = "https://www.sec.gov/Archives/edgar/data"
const flter_item = '5.02'

const CompanyTable = ({loading, pagination, onChange, dataSource, searchWord}) => {
  const [visible, setVisible] = useState(false)
  const [filingHtml, setFilingHtml] = useState('')
  const [rendering, setRendering] = useState(false)
  const [documentUrl, setDocumentUrl] = useState('')
  const [filingUrl, setFilingUrl] = useState('')

  const getHighlightText = (text, searchWord) => {
    const keys = searchWord.split(' ')
    let newText = text

    keys.map(key => {
      if(key.trim() != "")
        newText = text.replace(new RegExp(`(${key})`, 'gi'), `<mark>${searchWord}</mark>`)
    })

    return newText
  }

  const openDetailModal = async (data) => {
    let id = data._id.split(':')

    setVisible(true)
    setRendering(true)
    setDocumentUrl(`${filing_basic_url}/${data._source.ciks[0]}/${id[0].replace(/-/gi, '')}/${id[1]}`)
    setFilingUrl(`${filing_basic_url}/${data._source.ciks[0]}/${id[0].replace(/-/gi, '')}/${data._source.adsh}-index.html`)
    let response = await getFilingHtml(`${filing_basic_url}/${data._source.ciks[0]}/${id[0].replace(/-/gi, '')}/${id[1]}`)
    
    setFilingHtml(searchWord?getHighlightText(response, searchWord):response)
    setRendering(false)
  }

  const columns = [
    {
      title: 'From Type',
      dataIndex: 'file_type',
      key: 'file_type',
      width: '20%',
      render: (cell, row) => 
        <a href="#" onClick={() => openDetailModal(row)}>
          {`${row._source.form} (Current Report) ${row._source.file_type}`}
        </a>
    },
    {
      title: 'Filed At',
      dataIndex: 'file_date',
      key: 'file_date',
      width: '10%',
      render: (cell, row) => row._source.file_date
    },
    {
      title: 'CIK',
      dataIndex: 'ciks',
      key: 'ciks',
      width: '10%',
      render: (cell, row) => row._source.ciks.join(',')
    },
    {
      title: 'SIC',
      key: 'sics',
      dataIndex: 'sics',
      width: '10%',
      render: (cell, row) => row._source.sics.join(',')
    },
    {
      title: 'Company Name',
      key: 'display_names',
      dataIndex: 'display_names',
      render: (cell, row) => {
        let name = row._source.display_names[0].split('  ')
        name.pop()
        return name.join(' ')
      }
    },
    {
      title: 'Location',
      key: 'biz_locations',
      dataIndex: 'biz_locations',
      render: (cell, row) => row._source.biz_locations[0]
    },
    // {
    //   title: 'New Executive / Board member',
    //   key: 'new_executive',
    //   dataIndex: 'companyName',
    // },
    // {
    //   title: 'TXT Version of Filing',
    //   key: 'linkToTxt',
    //   dataIndex: 'linkToTxt',
    //   render: (link) => <a href={link} target="_blank">{link}</a>
    // },
    // {
    //   title: 'Attachments',
    //   key: 'linkToHtml',
    //   dataIndex: 'linkToHtml',
    //   render: (link) => <a href={link} target="_blank">{link}</a>
    // }
  ];



  return (
    <div className="filter-form">
      <Modal
        title={"View"}
        visible={visible}
        width={1000}
        style={{top: 20}}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)} className="mx-1">
            Close
          </Button>,
          <a href={documentUrl} target="_blank" className="mx-1">
            <Button key="document" type="primary">
              Open Document
            </Button>
          </a>,
          <a href={filingUrl} target="_blank" className="mx-1">
            <Button key="filing" type="primary">
              Open Filing
            </Button>
          </a>
        ]}
      >  
      {
        rendering? 
          <div className="loader">
            <Spin size="large" />
          </div>
          :
          <div className="filig_html" key={documentUrl} dangerouslySetInnerHTML={{__html: filingHtml}}></div>
      }
      </Modal>
      <Table 
        columns={columns} 
        rowKey={record => record._id}
        scroll={{ x: 1200 }}
        dataSource={(dataSource || []).filter(data => data._source.items.includes(flter_item))} 
        pagination={pagination}
        loading={loading} 
        onChange={onChange}
      />
    </div>
  );
}

export default CompanyTable