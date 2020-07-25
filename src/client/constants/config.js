import { getURLWithQueryParams } from "../utils/generic"

// API URL &  HOST URL
export const API_URL = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:5000';
export const HOST_URL = 'http://localhost:3000';


// LINKEDIN INFO
export const LINKEDIN_STATE = '123456'
const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress w_member_social'
const LINKEDIN_RIDERECT = (process.env.NODE_ENV === 'production') ? 'https://calm-reaches-80961.herokuapp.com/callback' : 'http://localhost:3000/callback';
const LINKEDIN_CLIENT_ID = '8610tyv63vt9tn'
export const LINKEDIN_URL = getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
  response_type: "code",
  client_id: LINKEDIN_CLIENT_ID,
  redirect_uri: LINKEDIN_RIDERECT,
  state: LINKEDIN_STATE,
  scope: LINKEDIN_SCOPE
})


// SEC.API KEY
export const SEC_KEY = '349d74770c0a4e2c9676b154ee1bb8ce641531c62f3b6a9b8e87a0c75ea3db1c'
export const SEC_QUERY_API_URL = 'https://api.sec-api.io'
export const SEC_STREAM_API_URL = 'https://api.sec-api.io:3334/all-filings'