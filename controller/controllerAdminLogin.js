const { AdminLoginModel } = require('../model/signupModel');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.ADMIN_AUTH_TOKEN;

const Login = async (req,res,next)=>{
     const {username, password } = req.body;
     const data = await AdminLoginModel.findOne({useremail:username});
     if (data) {
            if (data.password===password) {
                const token = Jwt.sign({username}, jwtKey, { expiresIn: "1d" });
                res.json({message:"VALID",token:token})
             }else{
                 res.json({message:"INVALID"});
             }
     }else{
         res.json({message:"INVALID"});
     }
}
module.exports = {Login};