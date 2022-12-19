const { newSignupModel, signupModel } = require("../model/signupModel");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.SIGN_UP_SECRET_KEY;
const SubmitOtp = async (req, res, next) => {

  if (typeof req.body.mobile === 'undefined' || typeof req.body.otp === 'undefined' ||typeof req.body.number === 'number') {
    res.json({message:"INVALID_FORMAT"});
    return;
  }
  if (req.body.mobile.length!==10) {
    res.json({message:"INVALID_FORMAT"});
    return;
  }

  let data = await newSignupModel.findOne({ mobile: req.body.mobile });
  
  if (!data) {
    res.json({message:"DATA_NOT_AVAILABLE"});
    return;
  }
  if (req.body.otp.length === 4 && data.otpCount < 5) {
    if (data) {
      if (data.otp == req.body.otp) {
        const data = await newSignupModel.findOne({ mobile: req.body.mobile });
        const hash = await bcrypt.hash(data.password, 10);
        req.body.password = hash;
        const dataToSubmit = new signupModel({
          name: data.name,
          mobile: data.mobile,
          password: hash,
          userCreatedAt: data.userCreatedAt,
          email: data.email,
        });
        await dataToSubmit.save();
        await newSignupModel.deleteMany({ mobile: req.body.mobile });
        const newData = await signupModel.findOne({ mobile: req.body.mobile });
        const id = newData._id;
        const token = Jwt.sign({ id }, jwtKey, { expiresIn: "10d" });
        res.json({ message: "CORRECT_OTP", token: token });
      } else {
        await newSignupModel.updateOne(
          { _id: data._id },
          { otpCount: data.otpCount + 1 }
        );
        res.json({ message: "INCORRECT_OTP", token: "NOT_AVAILABLE" });
      }
    } else {
      res.json({ message: "INVALID_DATA", token: "NOT_AVAILABLE" });
    }
  } else {
    res.json({ message: "LIMIT_REACHED", token: "NOT_AVAILABLE" });
  }
};

module.exports = { SubmitOtp };
