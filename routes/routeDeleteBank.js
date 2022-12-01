const express = require("express");
const Jwt = require("jsonwebtoken");
const jwtKey = "MYKEY";
const routeDeleteBank = express.Router();
const controllerDeleteBank = require("../controller/controllerDeleteBank");

const verifyToken = (req, res, next) => {
  const Bearer = req.headers["authorization"];
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
