import axios from 'axios';
import { GET_USERS } from '../constants/types';
import { API_URL } from '../constants/config'

export const getUsers = () => async dispatch => {
  const {data: {data}} = await axios.get(`${API_URL}/api/users`);
  dispatch({
    type: GET_USERS,
    payload: data
  });
};