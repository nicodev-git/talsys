import axios from 'axios';
import { SEC_SEARCH } from '../constants/types';
import { SEC_KEY, SEC_QUERY_API_URL } from '../constants/config';
import setAuthToken from 'client/utils/setAuthToken';
import AntNotification from 'client/components/Alert';

export const searchSECByQuery = (query_data) => async dispatch => {
  // Set SEC API key to Auth header
  try {
    setAuthToken(SEC_KEY);
  	const res  = await axios.post(SEC_QUERY_API_URL, query_data);
  	dispatch({
      type: SEC_SEARCH,
      payload: res.data
    });
  } catch( error ) {
    AntNotification('error', 'SEC API Failed', "Something wrong")
  }  
};