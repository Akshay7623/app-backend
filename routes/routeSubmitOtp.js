const express = require('express');
const routeSubmitOtp = express.Router();
const controllerSubmitOtp = require('../controller/controllerSubmitOtp');
routeSubmitOtp.post('/',controllerSubmitOtp.SubmitOtp);
module.exports = routeSubmitOtp;