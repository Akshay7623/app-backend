const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "MYKEY";
const routeAddBank = express.Router();
const controllerAddBank = require('../controller/controllerAddBank.js');

const verifyToken = (req,res,next)=>{
    const Bearer =  req.headers['authorization'];
    const token = Bearer.split(" ")[1];
    Jwt.verify(token, jwtKey, (err,authData)=>{
         if (err) {
             res.json({message:"INVALID"});
         }else{
            // 
             if (req.body.name.trim()==''||req.body.ifsc.trim()==''||req.body.bank_name.trim()==''||req.body.account.trim()==''||req.body.mobile.trim()==''||req.body.email.trim()=='') {
                res.json({message:"INVALID_FORMAT"});
             }else{
                req.body.id = authData.id;
                next();
             }
             
         }
    });
 }

routeAddBank.post('/',verifyToken,controllerAddBank.AddBank);
module.exports = routeAddBank;