import React from 'react'
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Divider } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from 'client/actions/authActions';
import { LINKEDIN_URL } from 'client/constants/config'

import LinkedinAuthButton from '../LinkedinAuth'
import Header from './Header'

import LoginLeft from 'client/assets/images/loginLeft.svg'

import './style.css'


class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({loading: true})
        await this.props.loginUser(values, this.props.history)
        this.setState({loading: false})
      }
    });
  };

  componentDidMount(){
    const {role}=this.props.auth.user
    if(localStorage.getItem('jwtToken'))
      this.props.history.push(role === 'admin'?'/admin/users':'/filings')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
   
    return (
      <div className="login-screen">
        <div className="w-100 h-100">
          <Header/>
          <div className="login-box">
            <Row gutter={50} className="mx-0">
              <Col lg={12}>
                <div className="login-left px-5 d-flex">
                  <img src={LoginLeft} className="mt-5"/>
                </div>
              </Col>
              <Col lg={12} className="py-5">
                <div className="login-right d-flex px-3 align-items-start flex-column justify-content-center">
                  <h2 className="mb-4">Welcome back to TalSys</h2>
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
                        rules: [{ required: true, message: 'Please input your password!' }],
                      })(
                        <Input.Password
                          size="large"
                          type="password"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item className="col-md-5 col-12 mb-3 mt-5">
                      <Button type="primary" 
                        loading={this.state.loading}
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