module.exports = {
  mongoURI: 'mongodb://iauto:iauto2019@ds161764.mlab.com:61764/iauto-api-dev',
  // mongoURI: 'mongodb://localhost:27017/iAutoData',
  testDB: 'mongodb://test:test123@ds163053.mlab.com:63053/mock-test',
  secretOrKey: 'jjgfawertkhjkhgszfdfghhkluy',
  email: 'forms@iradardata.com',
  emailPassword: 'Di3hidic*',
  infoEmail: 'info@iradardata.com',
  infoEmailPassword: '1nfoD4t4*',
  stripe: {
    publishable_key: 'pk_test_51H7UKEFoYeC8XD3iyHq1HwmHSsTOv3TPELn8VDjmroHZ1gajd8fbo139MXRjo0wrVbaHCQhiCYxd139ZMX8pz6Hg00CugT2Cwc',
    secret_key: 'sk_test_51H7UKEFoYeC8XD3iOJcDUqWQiNTeJ081lqYGcHPs1yflPcKzGIje97qbdeFa0wlO7MbrKPFDiEi0EeAX0I6gqjBY003hf5qKxH',
    product: 'prod_FClDOv1JvMnOJq'
  },

  LINKEDIN_ACCESS_TOKEN: 'https://www.linkedin.com/oauth/v2/accessToken',
  LINKEDIN_CLIENT_ID: '8610tyv63vt9tn',
  LINKEDIN_CLIENT_SECRET: 'Yve9kuJUvO8IKRy3',
  LINKEDIN_RIDERECT_URI: 'http://talsys.co/callback',
  // LINKEDIN_RIDERECT_URI: 'http://localhost:3000/callback',
  LINKEDIN_NAME_URL: 'https://api.linkedin.com/v2/me',
  LINKEDIN_EMAIL_URL: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
};
