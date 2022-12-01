const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const routeUpdateProfile = express.Router();
const controllerUpdateProfile= require('../controller/controllerUpdateProfile.js');

const verifyToken = (req,res,next)=>{
    const Bearer =  req.headers['authorization'];
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err,authData)=>{
         if (err) {
             res.json({message:"INVALID"});
         }else{
            // 
             if (req.body.name.trim()==''||req.body.email.trim()=='') {
                res.json({message:"INVALID_FORMAT"});
             }else{
                req.body.id = authData.id;
                next();
             }
             
         }
    });
 }

routeUpdateProfile.post('/',verifyToken,controllerUpdateProfile.UpdateProfile);
module.exports = routeUpdateProfile;