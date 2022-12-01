const express = require('express');
const routeSubmitResetPass = express.Router();
const controllerSubmitPass = require('../controller/controllerSubmitPass.js');
routeSubmitResetPass.all('/',controllerSubmitPass.ResetPass);
module.exports = routeSubmitResetPass;