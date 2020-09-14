module.exports = {
  mongoURI: 'mongodb://localhost:27017/talsys',
  testDB: '',
  secretOrKey: process.env.SECRET_OR_KEY,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
  infoEmail: 'info@iradardata.com',
  infoEmailPassword: '1nfoD4t4*',
  stripe: {
    publishable_key: 'pk_test_4fDaBtOFHufm0tSbCvsqsfjR00kRisY7Sg',
    secret_key: 'sk_test_P4tkJKy7NrS0JAk3SA36lWfw00B3TazSEA',
    product: 'prod_FClDOv1JvMnOJq'
  },
  LINKEDIN_ACCESS_TOKEN: 'https://www.linkedin.com/oauth/v2/accessToken',
  LINKEDIN_CLIENT_ID: '8610tyv63vt9tn',
  LINKEDIN_CLIENT_SECRET: 'Yve9kuJUvO8IKRy3',
  LINKEDIN_RIDERECT_URI: 'http://talsys.co/callback',
  LINKEDIN_NAME_URL: 'https://api.linkedin.com/v2/me',
  LINKEDIN_EMAIL_URL: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
};
