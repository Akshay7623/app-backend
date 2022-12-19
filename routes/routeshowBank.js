const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.SIGN_UP_SECRET_KEY;
const showBankRoute = express.Router();
const controllershowBank = require('../controller/controllershowBank.js');


const verifyToken = (req,res,next)=>{
    
    const Bearer = req.headers["authorization"];
    if (Bearer===undefined || Bearer.trim()==='') {
        res.json({ message: "AUTH_FAILED" });
        return;
    }
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, authData) => {
      if (err) {
        res.json({success:false});
      } else {
        req.body.id = authData.id;
        next();
      }
    });

}


showBankRoute.get('/',verifyToken,controllershowBank.ShowBank);
module.exports = showBankRoute;