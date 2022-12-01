const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const ShowProfileRoute = express.Router();
const controllerShowProfile = require('../controller/controllerShowProfile.js');

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

ShowProfileRoute.get('/',verifyToken,controllerShowProfile.ShowProfile);
module.exports = ShowProfileRoute;