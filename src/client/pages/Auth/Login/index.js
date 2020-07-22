import React from 'react'
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col} from 'antd';
import LandingIntro from 'client/pages/Static/Intro/LandingIntro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loginUser} from 'client/actions/authActions';

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
        <div className="login-box">
          <Row>
            <Col md={12}>
              <LandingIntro/>
            </Col>
            <Col md={12}>
              <div className="p-4 pt-5 flex-1 pb-5">
                <h2 className="text-center mb-4">Sign In</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item hasFeedback>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                  <Form.Item className="col-8 ml-auto mr-auto mb-3">
                    <Button type="primary" htmlType="submit" className="login-form-button ">
                      Sign in
                    </Button>
                  </Form.Item>
                </Form>
                 <p className="mg-b-0 text-center">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </Col>
          </Row>
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