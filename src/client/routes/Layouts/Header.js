import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from 'client/actions/authActions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { API_URL } from 'client/actions/types';
import ReactNotification from "react-notifications-component";

class Header extends Component {
  constructor(props) {
    super(props)
    this.socket = io(API_URL);
  }
  // componentWillUpdate() {
  //   const profileId = this.props.profile._id;
  //   const { getSocketNotification } = this.props;
  //     getSocketNotification(profileId);
  // }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
   
    return (
      <div className="slim-header">
        <div className="container">
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                Loream
              </Link>
            </h2>

            
          </div>
          <div className="slim-header-right">
            <div className="dropdown dropdown-c">
              <Link to="/" className="logged-user" data-toggle="dropdown">
                <img src="http://via.placeholder.com/500x500" alt="" />
                <span></span>
                <i className="fa fa-angle-down" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <nav className="nav">
                  <a href="page-profile.html" className="nav-link">
                    <i className="icon ion-person" /> View Profile
                  </a>
                  <a href="page-edit-profile.html" className="nav-link">
                    <i className="icon ion-compose" /> Edit Profile
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
