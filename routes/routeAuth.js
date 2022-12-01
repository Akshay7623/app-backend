const express = require('express');
const routeAuth = express.Router();
const controllerAuth = require('../controller/controllerAuth');
routeAuth.post('/',controllerAuth.Authentication);
module.exports = routeAuth;