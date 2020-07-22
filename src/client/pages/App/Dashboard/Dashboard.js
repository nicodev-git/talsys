import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dashboard.css';

export class Dashboard extends Component {

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        This is Dashboard Page
      </div>
    );
  }
}

export default Dashboard