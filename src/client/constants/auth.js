import { getURLWithQueryParams } from "../utils/generic"

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