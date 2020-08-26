import { getURLWithQueryParams } from "../utils/generic"

// API URL &  HOST URL
// export const API_URL = (process.env.NODE_ENV === 'production') ? 'http://3.20.238.99/' : 'http://localhost:5000';
export const API_URL = 'http://3.20.238.99/';
// export const API_URL = 'http://localhost:5000';

export const HOST_URL = 'http://localhost:3000';


// LINKEDIN INFO
export const LINKEDIN_STATE = '123456'
const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress w_member_social'
const LINKEDIN_RIDERECT = 'http://talsys.co/callback';
// const LINKEDIN_RIDERECT = 'http://localhost:3000/callback';
const LINKEDIN_CLIENT_ID = '8610tyv63vt9tn'
export const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
  response_type: "code",
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_RIDERECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE
})


// SEC.API KEY
export const SEC_KEY = '36cbcc2761c237cae2a541a6978c2497b141e211fb85e5d748a5f396eb067b3d'
export const SEC_QUERY_API_URL = 'https://efts.sec.gov/LATEST/search-index'
export const SEC_STREAM_API_URL = 'https://api.sec-api.io:3334/all-filings'


// STRIPE KEY
export const STRIPE_PUBLISHABLE = "pk_test_51H7UKEFoYeC8XD3iyHq1HwmHSsTOv3TPELn8VDjmroHZ1gajd8fbo139MXRjo0wrVbaHCQhiCYxd139ZMX8pz6Hg00CugT2Cwc"

export const COMPANY_NAME = "TelSys"
export const STRIPE_DESCRIPTION = "Upgrade"
export const UPGRADE_AMOUNT = 50