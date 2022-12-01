const { signupModel, otpModel } = require("../model/signupModel");
const bcrypt = require("bcrypt");


const ChangePassword = async (req, res, next) => {
  
  const password = req.body.password;
  signupModel.findOne({ _id: req.body.id }).then((data) => {
    if (data) {
      bcrypt.hash(password, 10).then((hashedPassword) => {
        signupModel
          .updateOne(
            { _id: req.body.id },
            { password: hashedPassword }
          )
          .then((updated) => {
            if (updated) {
              res.json({ success:true });
            } else {
              res.json({ success:false });
            }
          });
      });
    } else {
      res.json({ success:false });
    }
  });
  
};

module.exports = { ChangePassword };