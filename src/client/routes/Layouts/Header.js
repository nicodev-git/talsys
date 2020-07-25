import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from 'client/actions/authActions';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";

import WhiteLogo from "client/assets/images/logo-white.png"


class Header extends Component {
  constructor(props) {
    super(props)
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { profile } = this.props;
    const firstName = profile.firstName;

    return (
      <div className="slim-header">
        <div className="container-fluid px-5">
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                <img src={WhiteLogo} width="150"/>
              </Link>
            </h2>
          </div>
          <div className="search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
            />
            <button className="btn btn-primary">
              <i className="fa fa-search" />
            </button>
          </div>

          <div className="slim-header-right">
            <div className="dropdown dropdown-c">
              <Link to="/" className="logged-user" data-toggle="dropdown">
                <img src="http://via.placeholder.com/500x500" alt="" />
                <span>{firstName}</span>
                <i className="fa fa-angle-down" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <nav className="nav">
                  <a href="page-profile.html" className="nav-link">
                    <i className="icon ion-person" /> Profile
                  </a>
                  <a href="page-activity.html" className="nav-link">
                    <i className="icon ion-ios-bolt" /> Activity Log
                  </a> 

                  <Link to="" className="nav-link" onClick={this.onLogoutClick}>
                    <i className="icon ion-forward" /> Sign Out
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
