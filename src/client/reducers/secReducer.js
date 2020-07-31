import { SEC_SEARCH, FILING_UPDATE, CLEAR_UPDATES } from '../constants/types';
const initialState = {
  secData: null,
  filingUpdates: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEC_SEARCH:
      return {
        ...state,
        secData: action.payload
      };
    case FILING_UPDATE:
      let updatedFilings = Object.assign([], state.filingUpdates)
      updatedFilings.push(action.payload)
      
      return {
        ...state,
        filingUpdates: updatedFilings
      };
    case CLEAR_UPDATES:
      return {
        ...state,
        filingUpdates: []
      };
    default:
      return state;
  }
}
