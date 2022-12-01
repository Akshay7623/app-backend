const Jwt = require("jsonwebtoken");
const jwtKey = "MYKEY";

const { otpModel, signupModel } = require("../model/signupModel");
const Forgotpass = async (req, res, next) => {
  const mobile = req.body.mobile;
  const data = await signupModel.findOne({ mobile: mobile });
  if (data) {
    const result = await otpModel.findOne({ mobile: mobile });
    if (result) {
      const date = new Date().toString();
      const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      const Updated = await otpModel.updateOne(
        { mobile: mobile },
        { otp: newOtp, otpCreatedAt: date, otpCount:0 }
      );
      const token = Jwt.sign({ mobile }, jwtKey, { expiresIn: "5m" });
      res.json({ message: "OTP_SENT", token: token });
    } else {
      const date = new Date().toString();
      const newOtp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
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
