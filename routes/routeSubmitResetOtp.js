const express = require('express');
const routeSubmitResetOtp = express.Router();
const controllerSubmitResetOtp = require('../controller/controllerSubmitResetOtp');
routeSubmitResetOtp.post('/',controllerSubmitResetOtp.verify);
module.exports = routeSubmitResetOtp;