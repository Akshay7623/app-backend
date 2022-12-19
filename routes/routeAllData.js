const express =  require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.ADMIN_AUTH_TOKEN;
const routeAllData = express.Router();
const controllerAllData = require('../controller/controllerAllData.js');

const verifyToken = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    if (Bearer===undefined || Bearer.trim()==='') {
      res.json({ message: "AUTH_FAILED" });
      return;
  }
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, authData) => {
      if (err) {
        res.json({ message: "INVALID" });
      } else {
        next();
      };
      });
  
  };

routeAllData.get('/',verifyToken,controllerAllData.AllData);
module.exports = routeAllData;
