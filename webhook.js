const { response } = require("express");
const { PaymentModel } = require("./model/signupModel");

const data =
{"entity":"event",
"account_id":"acc_DwnvepjyJ1UxDO",
"event":"payment.captured",
"contains":["payment"],
"payload":
{"payment":
          {
            "entity": {
          "id":"pay_KnSZrcM1yleQPd",
          "entity":"payment",
          "amount":100,
          "currency":"INR",
          "status":"captured",
          "order_id":"order_KnSZcs28TePiQz",
          "invoice_id":null,
          "international":false,
          "method":"upi",
          "amount_refunded":0,
          "refund_status":null,
          "captured":true,
          "description":"Test transaction",
          "card_id":null,
          "bank":null,
          "wallet":null,
          "vpa":"merakshay2000@paytm",
          "email":"merakshay2000@gmail.com",
          "contact":"+917623049428",
          "notes":{
            "name":"Akshay",
            "account_number":"35899098542",
            "ifsc":"SBIN0060439",
            "mobile":"7623049428",
            "upi":""
                },
          "fee":3,
          "tax":0,
          "error_code":null,
          "error_description":null,
          "acquirer_data":{"rrn":"233761767782"},
          "created_at":1670075439,
          "base_amount":100
        }
      }
    },
    "created_at":1670075450
  }

const mydata =
  {
  "entity":"event",
  "account_id":"acc_DwnvepjyJ1UxDO",
  "event":"payment.captured",
  "contains":["payment"],
  "payload":{
    "payment":{"entity":
    {"id":"pay_KsH7iN72Uzw7Uv",
    "entity":"payment",
    "amount":100,
    "currency":"INR",
    "status":"captured",
    "order_id":"order_KsH7PhROHb6k02",
    "invoice_id":null,
    "international":false,
    "method":"upi",
    "amount_refunded":0,
    "refund_status":null,
    "captured":true,
    "description":"Rent or Maintanance",
    "card_id":null,
    "bank":null,
    "wallet":null,
    "vpa":"merakshay2000@paytm",
    "email":"merakshay2000@gmail.com",
    "contact":"+917623049428",
    "notes":{
    "upi":"35899098548",
    "ifsc":"SBIN0060439",
    "name":"Akshay",
    "mobile":"7623049428",
    "purpose":"Rent",
    "bank_account":"35899098548",
  },
  "fee":3,
  "tax":0,
  "error_code":null,
  "error_description":null,
  "error_source":null,
  "error_step":null,
  "error_reason":null,
  "acquirer_data":{
    "rrn":"234978205585"
  },
  "created_at":1671126802,
  "base_amount":100
  }
}
},
"created_at":1671126803
}

const webhook_secret  ="qITm4muTCE1uE9d6OzD3cB*1GFeYLmG$";

const order_id = webhookBody["payload"]["payment"]["entity"]["order_id"];
const status =  webhookBody["payload"]["payment"]["entity"]["status"];
const amount =  webhookBody["payload"]["payment"]["entity"]["amount"]/100;



const data = await PaymentModel.findOne({orderId:order_id});


if (data) {
  const userAmount = data.amount;
  if (status === "captured") {
    //continue here
    if (parseInt(amount) === parseInt(userAmount) && parseInt(amount) > 99) {
      //pass on
      res.status(200).send("Ok");
    } else if (parseInt(amount) < 100) {
      //remove entry from database here
      const del = await PaymentModel.deleteOne({ orderId: order_id });
      res.status(200).send("Ok");
    } else {
      //here it will come when what user said amount and by webhook amount doesnt matched !
      // do some modification in database here
      const update = await PaymentModel.updateOne(
        { orderId: order_id },
        { amount: amount }
      );
      res.status(200).send("Ok");
    }
  }
}

