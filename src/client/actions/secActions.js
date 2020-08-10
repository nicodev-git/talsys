import axios from 'axios';
import { SEC_SEARCH, FILING_UPDATE } from 'client/constants/types';
import { SEC_KEY, SEC_QUERY_API_URL, API_URL } from 'client/constants/config';
import setAuthToken from 'client/utils/setAuthToken';
import AntNotification from 'client/components/Alert';

export const searchSECByQuery = (query_data) => async dispatch => {
  // Set SEC API key to Auth header
  try {
  	const res = await fetch(SEC_QUERY_API_URL, 
      {
        method: 'post', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: JSON.stringify(query_data)
      })

    res.json().then(data => {
      dispatch({
        type: SEC_SEARCH,
        payload: data
      });
    }).catch((err) => {
      throw err
    })
  	
  } catch( error ) {
    AntNotification('error', 'SEC API Failed', "Something wrong")
  }  
};

export const addFilingUpdate = (new_filing) => async dispatch => {
  dispatch({
    type: FILING_UPDATE,
    payload: new_filing
  });
}

export const getFilingHtml  = async (url) => {
  try {
    const res = await axios.post(`${API_URL}/api/sec/html`, {url: url});
    return res.data
  } catch( error ) {
    AntNotification('error', 'SEC API Failed', "Something wrong")
    return error
  }  
}