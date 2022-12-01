const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const controllerChangePassword = require('../controller/controllerChagePassword.js');
const routeChangePassword = express.Router();


const verifyToken = (req,res,next)=>{
    const Bearer =  req.headers['authorization'];
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err,authData)=>{
         if (err) {
             res.json({message:"INVALID"});
         }else{
                req.body.id = authData.id;
                next();
         }
    });
 }



routeChangePassword.post('/',verifyToken,controllerChangePassword.ChangePassword);
module.exports = routeChangePassword;