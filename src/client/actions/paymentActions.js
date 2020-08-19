import axios from 'axios';
import AntNotification from 'client/components/Alert';
import {
   SUBSCRIBED
} from '../constants/types';
import { API_URL } from '../constants/config'
import setAuthToken from 'client/utils/setAuthToken';
import { loginUser } from 'client/actions/authActions';

export const upgradePayment = (data) => async dispatch => {
    try {
        const token = localStorage.getItem('jwtToken');
        // Set token to Auth header
        setAuthToken(token);
        await axios.post(`${API_URL}/api/payment/upgrade`, data);

        dispatch({
          type: SUBSCRIBED
        });
        AntNotification('success', 'Checkout Success', "You are successfully subscribed!")
    } catch(err) {
        AntNotification('error', 'Checkout Failed', "Something went wrong")
    }
};