const {signupModel} = require('../model/signupModel');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.SIGN_UP_SECRET_KEY;

const login = async(req,res,next)=>{
  

  if (typeof req.body.mobile === 'undefined'|| typeof req.body.password === 'undefined') {
    res.json({message:"INCORRECT_DATA"});
    return;
  }
  
  if (req.body.mobile.toString().trim()==='' || req.body.password.toString().trim()==='' || req.body.mobile.toString().length!=10 || req.body.password.toString().length<6 ) {
    res.json({message:"INCORRECT_DATA"});
    return;
  }

    const mobile = req.body.mobile;
    const password = req.body.password;
    const result = await signupModel.findOne({mobile:mobile});
    if(result){
      const hashedPassword = result.password;
        //user available in database now verify password with bcrypt 
      const check = await bcrypt.compare(password,hashedPassword);
      if (check) {
          //password matched !
        const id = result._id;
        const token = Jwt.sign({ id }, jwtKey, { expiresIn: "10d" });
        res.json({ message: "CORRECT_DATA", token: token });
      }else{
        res.json({message:"INCORRECT_DATA"});
      }
    }else{
      
        res.json({message:"INCORRECT_DATA"});
    }

}

module.exports = {login};