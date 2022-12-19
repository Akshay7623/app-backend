const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.ADMIN_AUTH_TOKEN;
const routeGetPayment = express.Router();
const controllerGetPayments = require('../controller/controllerGetPayments.js');

const verifyToken = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    if (Bearer===undefined || Bearer.trim()==='') {
      res.json({ message: "AUTH_FAILED" });
      return;
  }
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, authData) => {
      if (err) {
        res.json({ message: "AUTH_FAILED" });
      } else {
        next();
      }
    });
  };


routeGetPayment.post('/',verifyToken,controllerGetPayments.GetPayments);
module.exports = routeGetPayment;