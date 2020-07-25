import axios from 'axios';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GET_ERRORS } from './client/constants/types';

// Auth Pages
import LoginPage from './client/pages/Auth/Login';
import RegisterPage from './client/pages/Auth/Register';
import LinkedinCallback from './client/pages/Auth/LinkedinCallback';
import checkAuth from './client/utils/checkAuth';
import PrivateRoute from './client/routes/PrivateRoute';
import ScrollToTop from './client/utils/ScrollToTop';
import store from './client/utils/store';

// Dashoboard
import DashboardPage from './client/pages/App/Dashboard';

import AppLoading from './client/components/Loading';


import './App.css';
import 'antd/dist/antd.css';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    store.dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    return Promise.reject(error);
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    // Check for authentication
    try {
      await checkAuth(store);
      this.setState({ loading: false });
    } catch(err) {
      // Handle auth error
    }
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/callback' component={LinkedinCallback} />
            <div className='App'>
              <Switch>
                <PrivateRoute exact path='/dashboard' component={DashboardPage} />
                <PrivateRoute exact path='/main' component={DashboardPage} />
              </Switch>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
