const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const routeHistory = express.Router();
const controllerHistory = require('../controller/controllerHistory.js');

const verifyToken = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, authData) => {
      if (err) {
        res.json({ message: "AUTH_FAILED" });
      } else {
        req.body.id = authData.id;
        next();
      }
    });
  };

routeHistory.get('/',verifyToken,controllerHistory.History);
module.exports = routeHistory;