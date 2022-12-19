const express = require("express");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.SIGN_UP_SECRET_KEY;
const routeDeleteBank = express.Router();
const controllerDeleteBank = require("../controller/controllerDeleteBank");

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

routeDeleteBank.post("/", verifyToken, controllerDeleteBank.DeleteBank);
module.exports = routeDeleteBank;
