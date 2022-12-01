const express = require('express');
const signupRoute = express.Router();
const controllerSignup = require('../controller/controllerSignup')
signupRoute.all('/',controllerSignup.Signup);
module.exports = signupRoute;