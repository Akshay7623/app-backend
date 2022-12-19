const express = require('express');
const routeAdminLogin = express.Router();
const controllerAdminLogin = require('../controller/controllerAdminLogin.js');
routeAdminLogin.all('/',controllerAdminLogin.Login);
module.exports = routeAdminLogin;