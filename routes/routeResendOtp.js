const express = require('express');
const routeResendOtp = express.Router();
const controllerResendOtp = require('../controller/controllerResendOtp');
routeResendOtp.all('/',controllerResendOtp.resendOtp);
module.exports = routeResendOtp;