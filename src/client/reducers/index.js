import { combineReducers } from 'redux';
import accessReducer from './accessReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import secReducer from './secReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  access: accessReducer,
  users: userReducer,
  sec: secReducer
});
