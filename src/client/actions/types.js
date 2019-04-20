// NOTE: API_URL & HOST_URL need to change when deploy
export const API_URL = (process.env.NODE_ENV === "production") ? '' : 'http://localhost:5000';
export const HOST_URL = 'http://localhost:3000';

export const IS_REGISTERED = 'IS_REGISTERED';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_CURRENT_USER_PERMISSIONS = 'GET_CURRENT_USER_PERMISSIONS';
export const GET_CURRENT_USER_PROFILE = 'GET_CURRENT_USER_PROFILE';
export const PERMISSIONS_LOADING = 'PERMISSIONS_LOADING';
export const CLEAR_CURRENT_PERMISSIONS = 'CLEAR_CURRENT_PERMISSIONS';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';

export const GET_ADMIN_PERMISSIONS = 'GET_ADMIN_PERMISSIONS';
export const EDIT_ADMIN_PERMISSION = 'EDIT_ADMIN_PERMISSION';

export const GET_OTHER_USER_PROFILE = 'GET_OTHER_USER_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const GET_PROFILES = 'GET_PROFILES';

export const POST_LOADING = 'POST_LOADING';
export const GET_POSTS = 'GET_POSTS';
export const GET_USER_POSTS = 'GET_USER_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_COMMENT = 'GET_COMMENT';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export const GET_ALL_SUBMISSIONS = 'GET_ALL_SUBMISSIONS';
export const GET_SUBMISSION = 'GET_SUBMISSION';