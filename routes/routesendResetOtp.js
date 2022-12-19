const express = require('express');
const Jwt =  require('jsonwebtoken');
const jwtKey = process.env.FORGOT_PASSWORD_KEY;
const controllerSendResetOtp = require('../controller/cotrollerSendResetOtp');
const routesendResetOtp = express.Router();


const verifyToken = (req,res,next)=>{

    const Bearer =  req.headers['authorization'];
    if (!Bearer) {
        res.json({message:"INVALID"});
        return;
    }
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err,authData)=>{
         if (err) {
             res.json({message:"INVALID"});
         }else{
             req.mobile = authData.mobile;
             next();
         }
    });
 }

routesendResetOtp.post('/',verifyToken,controllerSendResetOtp.resetOtp);

module.exports = routesendResetOtp;