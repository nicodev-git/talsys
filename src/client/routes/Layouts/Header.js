import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from 'client/actions/authActions';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { Input, Icon, Affix } from 'antd'

import LogoIcon from "client/assets/images/logo.svg"


class Header extends Component {
  constructor(props) {
    super(props)
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { profile, filingUpdates } = this.props;
    const firstName = profile.firstName;
    const plan = profile.plan;

    const notifictions = filingUpdates.map((notification, index) => {
      console.log(notification)
      let url = "/notifications/view/" + notification.id;
      if (notification.type == "Notification") {
        url = "/notifications/view/" + notification.id;
      }
      else if (notification.type == "Submission") {
        url = "/modules/referrals/"; 
      }
      return (
          <React.Fragment key={index}>
            <a href={url} className="dropdown-link">
              <div className="media">
                <div className="media-body">
                  <h6>{notification.companyName}</h6>
                  <span>{notification.description}</span>
                </div>
              </div>
            </a>
          </React.Fragment>
        )
    })

    return (
      <div className="slim-header flex-column" style={{  zIndex: 1, width: '100%', borderBottom: 'none' }}>
        <div className="container-fluid" style={{padding: '0 3%'}}>
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                <img src={LogoIcon} height="70"/>
              </Link>
            </h2>
          </div>
         
          <div className="slim-header-right">
            <div className="dropdown dropdown-b">
              <Link
                to=""
                className="header-notification"
                data-toggle="dropdown"
              >
                <i className="icon ion-ios-bell-outline" />
                {this.props.filingUpdates.length == 0 ? "" : <span className="indicator" /> }
              </Link>
              <div className="dropdown-menu">
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-menu-title">FEEDS</h6>
                  <div>
                    <Link to="/">Mark All as Read</Link>
                  </div>
                </div>
                <div className="dropdown-list">
                  {notifictions}
                  
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-c">
              <Link to="/" className="logged-user" data-toggle="dropdown">
                <div className="bg-primary d-flex align-items-center justify-content-center" style={{width: 40, height: 40, borderRadius: '50%'}}>
                  <Icon type="user" style={{color: 'white'}}/>
                </div>
                <span>{firstName}</span>
                <i className="fa fa-angle-down" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <nav className="nav">
                  <Link to="/profile" className="nav-link">
                    <i className="icon ion-person" /> Profile
                  </Link>

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
  profile: state.auth.profile,
  filingUpdates: state.sec.filingUpdates
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
