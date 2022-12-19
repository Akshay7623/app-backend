const Jwt = require("jsonwebtoken");
const jwtKey = process.env.FORGOT_PASSWORD_KEY;

const { otpModel, signupModel } = require("../model/signupModel");
const Forgotpass = async (req, res, next) => {

  if (typeof req.body.mobile === 'undefined') {
    res.json({ message: "USER_NOT_EXIST", token: "NOT_AVAILABLE" });
    return;
  }
  if (req.body.mobile.toString().length !=10 ) {
    res.json({ message: "USER_NOT_EXIST", token: "NOT_AVAILABLE" });
    return;
  }

  const mobile = req.body.mobile;
  const data = await signupModel.findOne({ mobile: mobile });
  if (data) {
    const result = await otpModel.findOne({ mobile: mobile });
    let newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000).toString();
    if (result) {
      const date = new Date().toString();
      const Updated = await otpModel.updateOne(
        { mobile: mobile },
        { otp: newOtp, otpCreatedAt: date, otpCount:0 }
      );
      const token = Jwt.sign({ mobile }, jwtKey, { expiresIn: "5m" });
      res.json({ message: "OTP_SENT", token: token, otp:newOtp });
    } else {
      const date = new Date().toString();
      const token = Jwt.sign({ mobile }, jwtKey, { expiresIn: "5m" });
      const data = otpModel({
        mobile: mobile,
        otp: newOtp,
        otpCreatedAt: date,
      });
      const result = await data.save();
      res.json({ message: "OTP_SENT", token: token });
    }
  } else {
    res.json({ message: "USER_NOT_EXIST", token: "NOT_AVAILABLE" });
  }
};

module.exports = { Forgotpass };
