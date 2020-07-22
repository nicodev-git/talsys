import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col} from 'antd';
import LandingIntro from 'client/pages/Static/Intro/LandingIntro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loginUser} from 'client/actions/authActions';

import Select from "react-select";
import {registerClientUser} from "client/actions/authActions";

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
          <div className="register-screen p-3">
            <div className="register-box">
              <Row>
                <Col md={12}>
                  <LandingIntro/>
                </Col>
                <Col md={12}>
                  <div className="p-4 pt-5 flex-1 pb-5">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={this.handleSubmit} className="register-form">
                      <Row gutter={8}>
                        <Col md={12}>
                          <Form.Item hasFeedback>
                            {getFieldDecorator('firstName', {
                              rules: [{ required: true, message: 'Please input your first name!' }],
                            })(
                              <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="First Name"
                              />,
                            )}
                          </Form.Item>
                        </Col>
                        <Col md={12}>
                          <Form.Item hasFeedback>
                            {getFieldDecorator('lastName', {
                              rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                              <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Last Name"
                              />,
                            )}
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item hasFeedback>
                        {getFieldDecorator('email', {
                          rules: [
                            { required: true, message: 'Please input your Password!' },
                            { type: 'email', message: 'The input is not valid E-mail!'}
                          ],
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                          />,
                        )}
                      </Form.Item>
                      
                      <Form.Item hasFeedback>
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                          />,
                        )}
                      </Form.Item>
                      <Form.Item hasFeedback dependencies={['password']}>
                        {getFieldDecorator('passwordConfirmation', {
                          rules: [
                            { required: true, message: 'Please input your Cofirm Password!' },
                            { validator: (rule, value, callback) => {
                                const form = this.props.form;
                                if (value && value !== form.getFieldValue('password')) {
                                  callback('Two passwords that you enter is inconsistent!');
                                } else {
                                  callback();
                                }
                              }
                            }
                          ],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Confirm Password"
                          />,
                        )}
                      </Form.Item>
                      <Form.Item className="col-8 ml-auto mr-auto mb-3">
                        <Button type="primary" htmlType="submit" className="login-form-button ">
                          Sign Up
                        </Button>
                      </Form.Item>
                    </Form>
                     <p className="mg-b-0 text-center">
                      You have already account? <Link to="/">Sign In</Link>
                    </p>
                  </div>
                </Col>
              </Row>
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
