import axios from 'axios';
import { GET_USERS, DELETE_USER } from '../constants/types';
import { API_URL } from '../constants/config'

export const getUsers = () => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/users`);
  dispatch({
    type: GET_USERS,
    payload: data
  });
};

export const deleteUser = (id) => async dispatch => {
  const res = await axios.post(`${API_URL}/api/users/deleteuser/${id}`);
  dispatch({
    type: DELETE_USER,
    payload: id
  });
};