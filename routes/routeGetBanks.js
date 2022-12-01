const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const routeGetBank = express.Router();
const controllerGetBank = require('../controller/controllerGetBank.js');

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

routeGetBank.get('/',verifyToken,controllerGetBank.GetBank);
module.exports = routeGetBank;