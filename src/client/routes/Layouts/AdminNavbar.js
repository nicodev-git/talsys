import classnames from 'classnames';
import propTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {logoutUser} from 'client/actions/authActions';

class AdminNavbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  
  render() {
    return (
      <div className="bg-primary py-2">
        <div className="container">
          <ul className="nav">
            <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/admin/users'
              })}
            >
              <Link className="nav-link text-white" to="/admin/users">
                <i className="icon ion-ios-users"/>
                <span>Users</span>
              </Link>
            </li>
            <li
              className={classnames('nav-item', {
                active: this.props.location.pathname === '/admin/payments'
              })}
            >
              <Link className="nav-link text-white" to="/admin/users">
                <i className="icon ion-ios-users"/>
                <span>Payments</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

AdminNavbar.propTypes = {
  logoutUser: propTypes.func.isRequired
};


export default withRouter(
  connect(
    null,
    { logoutUser }
  )(AdminNavbar)
);
