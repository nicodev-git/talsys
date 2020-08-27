import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../constants/config'
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER_PROFILE,
  CLEAR_ERRORS,
  CLEAR_CURRENT_PROFILE
} from '../constants/types';
import setAuthToken from 'client/utils/setAuthToken';
import AntNotification from 'client/components/Alert';

export const registerClientUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/api/users/register/client`, userData);
    AntNotification('success', 'Signup Success!', res.data.message)
    history.push({
      pathname: '/',
      isRegistered: true,
      detail: 'Your user have been created. Sign in now'
    });
  } catch( error ) {
    AntNotification('error', 'Signup Failed', error.response.data.errorMsg)
  }
};

//Add new user through ADMIN Role
export const registerUser = (userData, history) => async dispatch => {
  // getter
  const token = localStorage.getItem('jwtToken');
  // Set token to Auth header
  setAuthToken(token);
  await axios.post(`${API_URL}/api/users/register/user`, userData);
  history.push({
    pathname: '/settings/admin-settings',
    isRegistered: true,
    detail: 'New user created!'
  });
};

//Update user
export const updateUser = (userData) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  // Set token to Auth header
  setAuthToken(token);
  await axios.put(`${API_URL}/api/users/updateuser`, userData);
};

export const deleteUsers = (permissionIds, history) => async dispatch => {
  // getter
  const token = localStorage.getItem('jwtToken');
  const payload = {permissionIds: Array.from(permissionIds)};
  // Set token to Auth header
  setAuthToken(token);
  await axios.post(`${API_URL}/api/users/deleteUser`, payload);
  history.push({
    pathname: '/settings/admin-settings',
    isRegistered: true,
    detail: 'User deleted!'
  });
};

// Login - Get User Token
export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/api/users/login`, userData);
    const { token } = res.data;
    // Set token to lS
    localStorage.setItem('jwtToken', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Get current user profile
    dispatch(getCurrentUserProfile(decoded.userId));
    // Set current user
    dispatch(setCurrentUser(decoded));

    history.push({
      pathname: decoded.role === 'admin'?'/admin/users':'/filings',
    });

  } catch (error) {
    AntNotification('error', 'Sign In Failed', error.response.data.errorMsg)
    return dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};


// Get current user profile
export const getCurrentUserProfile = userId => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/api/users/${userId}`);
    // console.log(res);
    dispatch({
      type: GET_CURRENT_USER_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
    throw new Error(error);
  }
};


// Login with Linkedin
export const loginWithLinkedin = (code, history) => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/api/users/linkedin-login`, {code:code});

    const { token } = res.data;
    // Set token to lS
    localStorage.setItem('jwtToken', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Get current user profile
    dispatch(getCurrentUserProfile(decoded.userId));
    // Set current user
    dispatch(setCurrentUser(decoded));

    history.push({
      pathname: decoded.role === 'admin'?'/admin/users':'/filings',
    });

  } catch (error) {
    console.log(error)
    AntNotification('error', 'Sign In Failed', error.response.data.errorMsg)
    return dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for ruture requests
  setAuthToken(false);
  // Clear errors
  dispatch(clearErrors());
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Request Reset Password
export const resetPassword = (email, history) => async dispatch => {
  await axios.post(`${API_URL}/api/users/reset-password`, email);
  history.push({
    pathname: '/reset-password',
    isRequested: true
  });
};

// Update Password
export const updatePassword = (userData, history) => async dispatch => {
  const token = localStorage.getItem('jwtToken');
  // Set token to Auth header
  setAuthToken(token);
  await axios.put(`${API_URL}/api/users/reset-password`, userData);
  history.push({
    pathname: '/',
    isReset: true,
    detail: 'Your password have been updated. Sign in now'
  });
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
