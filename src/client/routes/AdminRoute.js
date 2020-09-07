import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { decoded } from 'client/utils/checkAuth';
import store from 'client/utils/store';
import { logoutUser } from 'client/actions/authActions';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import ClientNavbar from './Layouts/ClientNavbar';
import AdminNavbar from './Layouts/AdminNavbar';


class AdminRoute extends Component {
  componentDidUpdate() {
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
    }
  }

  render() {
    const { component: Component, auth, permissions, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated === true && auth.user.role === 'admin'? (
            <Layout style={{height: '100%', minHeight: '100vh'}}>
              <Header/>
              <AdminNavbar/>
              <Layout.Content className="bg-white" style={{paddingTop: 0}}>
                <Component {...props} />
              </Layout.Content>
            </Layout>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default withRouter(connect(mapStateToProps)(AdminRoute));
