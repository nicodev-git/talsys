
import React, { Component } from 'react'
import { Spin, Space } from 'antd'

const Loading = () => 
  <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
    <Spin size="large" />
  </div>

export default Loading
