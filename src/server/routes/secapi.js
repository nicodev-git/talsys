const express = require('express');
const passport = require('passport');

const router = express.Router();

const secController = require('../controllers/secapi');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/html', secController.getFilingHtml);

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public

module.exports = router;
