const express = require('express');
const routeResend = express.Router();
const controllerResend = require('../controller/controllerResend');
routeResend.all('/',controllerResend.resend);
module.exports = routeResend;