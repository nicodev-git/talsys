import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Table, Tag, Space, Modal, Button, Spin, List, Skeleton, Icon } from 'antd';
import { getFilingHtml } from 'client/actions/secActions';

import FilingItem from './FilingItem'

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


  const getDocumentUrl = (data) => {
    let id = data._id.split(':')

    return `${filing_basic_url}/${data._source.ciks[0]}/${id[0].replace(/-/gi, '')}/${id[1]}`    
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
      <List
        className="filing-list"
        loading={loading}
        itemLayout="vertical"
        size="large"
        pagination={{
          ...pagination,
          onChange: page => {
            onChange(page)
          },
        }}
        dataSource={(dataSource || []).filter(data => data._source.items.includes(flter_item))}
        renderItem={item => <FilingItem item={item} openDetailModal={openDetailModal} documentUrl={getDocumentUrl(item)}/>}
      />
    </div>
  );
}

export default CompanyTable