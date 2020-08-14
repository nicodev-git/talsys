import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Checkbox } from 'antd';
import LandingIntro from 'client/pages/Static/Intro/LandingIntro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loginUser} from 'client/actions/authActions';

import Select from "react-select";
import {registerClientUser} from "client/actions/authActions";
import Header from './Header'

import RegisterLeft from 'client/assets/images/signupLeft.svg'


import './style.css'


class RegisterForm extends Component {
    componentDidMount() {
      if (localStorage.getItem('jwtToken')) {
          this.props.history.push('/dashboard');
      }
    }


    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.registerClientUser(values, this.props.history)
        }
      });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
          <div className="register-screen">
            <div className="w-100 h-100">
              <Header/>
              <div className="login-box">
                <Row gutter={50} className="mx-0 h-100">
                  <Col lg={12} className="h-100">
                    <div className="login-left px-5 d-flex align-items-end justify-content-center">
                      <img src={RegisterLeft}/>
                    </div>
                  </Col>
                  <Col lg={12} className="h-100">
                    <div className="login-right d-flex px-5 align-items-start flex-column justify-content-center">
                      <h2 className="mb-5">Sign Up  to try our amazing services</h2>
                      <Form onSubmit={this.handleSubmit} className="register-form w-100">
                        <Row gutter={8}>
                          <Col md={12}>
                            <p className="mb-2">First Name</p>
                            <Form.Item hasFeedback>
                              {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }],
                              })(
                                <Input size="large"/>
                              )}
                            </Form.Item>
                          </Col>
                          <Col md={12}>
                            <p className="mb-2">Last Name</p>
                            <Form.Item hasFeedback>
                              {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                              })(
                                <Input size="large"/>
                              )}
                            </Form.Item>
                          </Col>
                        </Row>
                        <p className="mb-2">Email Address</p>
                        <Form.Item hasFeedback>
                          {getFieldDecorator('email', {
                            rules: [
                              { required: true, message: 'Please input your Password!' },
                              { type: 'email', message: 'The input is not valid E-mail!'}
                            ],
                          })(
                            <Input size="large" type="email"/>,
                          )}
                        </Form.Item>
                        
                        <p className="mb-2">Password</p>
                        <Form.Item hasFeedback>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                            <Input type="password" size="large"/>
                          )}
                        </Form.Item>

                        <Form.Item hasFeedback dependencies={['password']}>
                          <Checkbox>I accept the TalSys terms of service</Checkbox>
                        </Form.Item>
                        <Form.Item className="col-6 mb-3 mt-5">
                          <Button type="primary" htmlType="submit" shape="round" className="login-form-button" size="large">
                            Get Started
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


const Register = Form.create({ name: 'register_form' })(RegisterForm);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  registerClientUser
}, dispatch);


Register.propTypes = {
  registerClientUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Register)
