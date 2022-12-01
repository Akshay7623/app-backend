const express = require('express');
const controllerRecord = require('../controller/controllerRecord');
const routeRecord = express.Router();
routeRecord.post('/',controllerRecord.record);
module.exports = routeRecord;