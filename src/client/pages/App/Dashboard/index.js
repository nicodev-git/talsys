import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import io from 'socket.io-client';
import { API_URL } from '../../../actions/types';
import { connect } from 'react-redux';

export default class DashboardPage extends Component {
	  render() {
	    return (
		    <div>
		    	<div className="container">
		            <h6 className="slim-pagetitle">Dashboard</h6>
		        </div>
		    	<Dashboard />
		    </div>
	    );
	  }
}
