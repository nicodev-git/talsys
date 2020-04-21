import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import Animate from 'react-smooth'
import { Form, Icon, Input, Button, Row, Col} from 'antd';
import LandingIntro from '../LandingIntro';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {loginUser} from '../../../actions/authActions';

import Select from "react-select";
import {registerClientUser} from "../../../actions/authActions";
import TextFieldGroup from "../../Elements/TextFieldGroup";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import 'react-phone-number-input/style.css';

import './Register.css'


class RegisterForm extends Component {

		constructor() {
				super();
				this.state = {
						firstName: '',
						lastName: '',
						services: '',
						phone: '',
						email: '',
						password: '',
						passwordConfirmation: '',
						errors: {}
				};
		}

		componentDidMount() {
				if (this.props.auth.isAuthenticated) {
						this.props.history.push('/dashboard');
				}
		}

		componentWillReceiveProps(nextProps) {
				if (nextProps.errors) {
						this.setState({errors: nextProps.errors});
				}
		}

		OnSelectChange = e => {
				this.setState({services: e.value});
		};
		onChangePhone = e => {
				if (e) {
						if (isValidPhoneNumber(e)) {
								this.setState({phone: e});
								this.setState({errors: {phone: ""}});
						} else {
								this.setState({errors: {phone: "Invalid phone number"}});
						}
				}
		};

		onChange = e => {
				this.setState({[e.target.name]: e.target.value});
		};

		onSubmit = e => {
				e.preventDefault();
				this.setState({submitTime: this.state.submitTime + 1});
				const newUser = {
						firstName: this.state.firstName,
						lastName: this.state.lastName,
						services: this.state.services,
						phone: this.state.phone,
						email: this.state.email,
						password: this.state.password,
						passwordConfirmation: this.state.passwordConfirmation
				};
				this.props.registerClientUser(newUser, this.props.history);
		};

		handleSubmit = e => {
			e.preventDefault();
			this.props.form.validateFields((err, values) => {
				if (!err) {
					this.props.registerClientUser(values, this.props.history)
				}
			});
		};

		render() {
				let {errors} = this.state;
				const { getFieldDecorator } = this.props.form;

				return (
					<div className="register-screen p-3">
						<Animate to="1" from="0" attributeName="opacity" easing="ease-in">
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
						</Animate>
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
