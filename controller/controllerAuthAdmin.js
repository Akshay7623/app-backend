const { AdminLoginModel } = require('../model/signupModel');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.ADMIN_AUTH_TOKEN;

const Authentication = async (req,res,next)=>{
    res.json({message:"VALID"});
}


module.exports = {Authentication};