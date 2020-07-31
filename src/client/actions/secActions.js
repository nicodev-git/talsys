import axios from 'axios';
import { SEC_SEARCH, FILING_UPDATE } from 'client/constants/types';
import { SEC_KEY, SEC_QUERY_API_URL } from 'client/constants/config';
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

    // const res1 = await axios.get('https://www.sec.gov/Archives/edgar/data/783324/000110465920087873/0001104659-20-087873-index.htm')

    // console.log(res1)
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