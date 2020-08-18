const jwt = require('jsonwebtoken');
const validator = require('validator');
const { URLSearchParams } = require('url')
const fetch = require('node-fetch')

// @route GET api/sec/html
// @desc Get SEC filing html
// @access Public
exports.getFilingHtml = async (req, res) => {
  const {
    url
  } = req.body;

	fetch(url)
	  .then(res => res.text())
	  .then(response => {
	    res.send(response);
	  })
};


