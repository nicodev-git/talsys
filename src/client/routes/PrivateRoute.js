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


class PrivateRoute extends Component {
  componentDidUpdate() {
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
    }
  }

  render() {
    const { component: Component, auth, permissions, ...rest } = this.props;

    let navbar = null;
    
    const role = 'user'

    if (role === 'user') navbar = <ClientNavbar />;

    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated === true ? (
            <Layout>
              <Header/>
              <Layout.Content className="p-4">
                <Component {...props} />
              </Layout.Content>
              <Footer />
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


export default withRouter(connect(mapStateToProps)(PrivateRoute));
