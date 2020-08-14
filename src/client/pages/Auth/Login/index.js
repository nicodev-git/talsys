import React from 'react'
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Divider } from 'antd';
import LandingIntro from 'client/pages/Static/Intro/LandingIntro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from 'client/actions/authActions';
import { LINKEDIN_URL } from 'client/constants/config'

import LinkedinAuthButton from '../LinkedinAuth'
import Header from './Header'

import LoginLeft from 'client/assets/images/loginLeft.svg'

import './style.css'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values, this.props.history)
      }
    });
  };

  componentDidMount(){
    if(localStorage.getItem('jwtToken'))
      this.props.history.push('/dashboard')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
   
    return (
      <div className="login-screen">
        <div className="w-100 h-100">
          <Header/>
          <div className="login-box">
            <Row gutter={50} className="mx-0 h-100">
              <Col lg={12} className="h-100">
                <div className="login-left px-5 d-flex align-items-end justify-content-center">
                  <img src={LoginLeft}/>
                </div>
              </Col>
              <Col lg={12} className="h-100">
                <div className="login-right d-flex px-5 align-items-start flex-column justify-content-center">
                  <h2>Welcome back to TalSys</h2>
                  <LinkedinAuthButton/>
                  <Divider className="mt-2 mb-5">or</Divider>
                  <Form onSubmit={this.handleSubmit} className="login-form w-100">
                    <p className="mb-2">Email</p>
                    <Form.Item hasFeedback>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                      })(
                        <Input
                          size="large"
                        />,
                      )}
                    </Form.Item>
                    <p className="mb-2">Password</p>
                    <Form.Item hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input
                          size="large"
                          type="password"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item className="col-5 mb-3 mt-5">
                      <Button type="primary" 
                        size="large"
                        shape="round"
                        htmlType="submit" className="login-form-button mb-3">
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginUser
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Login)