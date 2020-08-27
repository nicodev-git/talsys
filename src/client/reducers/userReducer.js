import {GET_USERS, DELETE_USER} from '../constants/types';

const initialState = {
  loading: true,
  allUsers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.user._id != action.payload)
      };
    default:
      return state;
  }
}
