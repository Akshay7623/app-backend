const express = require('express');
const routeLogin = express.Router();
const controllerLogin = require('../controller/controllerLogin');
routeLogin.post('/',controllerLogin.login);
module.exports = routeLogin;