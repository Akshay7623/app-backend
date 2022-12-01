const express = require('express');
const routeForgotpass = express.Router();
const controllerForgotpass =require('../controller/controllerForgotpass');
routeForgotpass.all('/',controllerForgotpass.Forgotpass);
module.exports = routeForgotpass;