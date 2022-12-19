const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.ADMIN_AUTH_TOKEN;
const routeGetAllUser = express.Router();
const controllerGetAllUser = require('../controller/controllerGetAllUser.js');

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


routeGetAllUser.post('/',verifyToken,controllerGetAllUser.GetAllUser);
module.exports = routeGetAllUser;