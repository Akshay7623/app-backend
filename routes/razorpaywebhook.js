const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const { PaymentModel } = require('../model/signupModel');
const express = require('express');
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
const RazorpayWebhook = express.Router();
RazorpayWebhook.post('/',async(req,res)=>{
    const webhookBody = req.body;
    const webhookSignature = req.headers["x-razorpay-signature"];
    if (typeof webhookSignature === 'undefined' || typeof req.body === 'undefined') {
        res.json({ success: false });
        return;
      }
      if (req.body.toString().trim() === '' || webhookSignature.toString().trim() === '') {
        res.json({ success: false });
        return;
      }
  if (validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, webhookSecret)) {
    const order_id = webhookBody["payload"]["payment"]["entity"]["order_id"];
    const status = webhookBody["payload"]["payment"]["entity"]["status"];
    const amount = webhookBody["payload"]["payment"]["entity"]["amount"] / 100;
    const data = await PaymentModel.findOne({ orderId: order_id });

    if (data) {
      const userAmount = data.amount;
      if (status === "captured") {
        if (parseInt(amount) === parseInt(userAmount) && parseInt(amount) > 99) {
          res.status(200).send("Ok");
        } else if (parseInt(amount) < 100) {
          const del = await PaymentModel.deleteOne({ orderId: order_id });
          console.log("entry deleted");
          res.status(200).send("Ok");
        } else {
          const update = await PaymentModel.updateOne({ orderId: order_id },{ amount: amount });
          res.status(200).send("Ok");
        }
      }
    }
  }else {
    res.json({ message: "auth failed" });
    return;
  }
  
});
module.exports = RazorpayWebhook;