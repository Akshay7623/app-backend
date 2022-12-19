const express = require("express");
const Jwt = require("jsonwebtoken");
const { otpModel } = require("../model/signupModel");
const jwtKey = process.env.ENTER_NEW_PASS_KEY;
const routeAuthReset = express.Router();
const controllerAuthReset = require("../controller/controllerAuthReset");

const verifyData = async (data) => {
  const getData = await otpModel.findOne({ mobile: data });
  return getData;
};
const verifyToken = (req, res, next) => {
  const Bearer =  req.headers['authorization'];
    if (!Bearer) {
        res.json({message:"INVALID"});
        return;
    }
  const token = Bearer.split(" ")[1];
  Jwt.verify(token, jwtKey, (err, authData) => {
    if (err) {
      res.json({ message: "INVALID" });
    } else {
      verifyData(authData.mobile).then((data) => {
        if (data) {
          next();
        } else {
          res.json({ message: "INVALID" });
        }
      });
    }
  });
};

routeAuthReset.post("/", verifyToken, controllerAuthReset.Authentication);
module.exports = routeAuthReset;
