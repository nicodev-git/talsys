import { SEC_SEARCH } from '../constants/types';
const initialState = {
  secData: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEC_SEARCH:
      return {
        ...state,
        secData: action.payload
      };
    default:
      return state;
  }
}
