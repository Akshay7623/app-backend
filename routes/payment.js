const router = require("express").Router();
const { PaymentModel } = require("../model/signupModel");
const Jwt = require("jsonwebtoken");
const jwtKey = "MYKEY";
const Razorpay = require("razorpay");
const crypto = require("crypto");

const verifyToken = (req, res, next) => {
  const Bearer = req.headers["authorization"];
  const token = Bearer.split(" ")[1];
  Jwt.verify(token, jwtKey, (err, authData) => {
    if (err) {
      res.json({ message: "INVALID" });
    } else {
      req.body.id = authData.id;
      next();
    }
  });
};

router.post("/orders", verifyToken, async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_live_OEtqVhgDuLje5D",
      key_secret: "l8D1KhF9g0JRDubt9gXitBUJ",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      notes: req.body.notes,
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Something Went Wrong!", auth: false });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", auth: false });
    console.log(error);
  }
});

router.post("/verify", verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, notes, id, } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "l8D1KhF9g0JRDubt9gXitBUJ")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // here we have onject named notes:
      // userId:String,
      // name: String,
      // bank_account:String,
      // ifsc:String,
      // mobile: String,
      // amount:String,
      // paymentCreatedAt: String,
      //name, mobile, amount, bank_account, ifsc and in a req.body.id we have id of that user
      const { name, mobile, amount, bank_account, ifsc } = notes;
      const data = new PaymentModel({
        userId: id,
        name: name,
        bank_account: bank_account,
        ifsc: ifsc,
        mobile: mobile,
        amount: amount, 
	});
      const result = await data.save();
      return res
        .status(200)
        .json({ message: "Payment verified successfully", auth: true });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid signature sent!", auth: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", auth: false });
    console.log(error);
  }
});

module.exports = router;
