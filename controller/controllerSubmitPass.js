const { signupModel, otpModel } = require("../model/signupModel");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.ENTER_NEW_PASS_KEY;

const ResetPass = async (req, res, next) => {

  const Bearer =  req.headers['authorization'];
    if (!Bearer) {
        res.json({message:"INVALID_DATA"});
        return;
    }
  if (typeof req.body.newPassword === 'undefined') {
        res.json({message:"INVALID_DATA"});
        return;
  }
  if (req.body.newPassword.toString().length<6) {
        res.json({message:"INVALID_DATA"});
        return;
  }
  const token = Bearer.split(" ")[1];
  const password = req.body.newPassword;
  Jwt.verify(token, jwtKey, (err, authData) => {
    if (err) {
      res.json({ message: "INVALID_DATA", auth: false });
    } else {
      signupModel.findOne({ mobile: authData.mobile }).then((data) => {
        if (data) {
          bcrypt.hash(password, 10).then((hashedPassword) => {
            signupModel
              .updateOne(
                { mobile: authData.mobile },
                { password: hashedPassword }
              )
              .then((updated) => {
                if (updated) {
                  otpModel.deleteMany({ mobile: authData.mobile })
                    .then((done) => {
                      if (done) {
                        res.json({ message: "SUCCESS", auth: true });

                      } else {
                        res.json({ message: "FAIL", auth: false });
                      }
                    });
                } else {
                  res.json({ message: "FAIL", auth: false });
                }
              });
          });
        } else {
          res.json({ message: "FAIL", auth: false });
        }
      });
    }
  });
};

module.exports = { ResetPass };
