const mongoose =  require('mongoose');

const newSignupShema = new mongoose.Schema({
  name: String,
  mobile: String,
  password: String,
  userCreatedAt: String,
  otp: String,
  email:{type:String,
  default:''
  },
  otpCount:{type:Number, 
  default : 0,
  }
});

const PaymentSchema = new mongoose.Schema({
  userId:String,
  name: String,
  bank_account:String,
  ifsc:String,
  mobile: String,
  amount:String,
  paymentCreatedAt: {
    type:String,
    default:new Date().toString()
  },
});

const signupSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  password: String,
  userCreatedAt: String,
  email:{type:String,
    default:''
    },
});

const otpSchema = new mongoose.Schema({
  mobile:String,
  otp:String,
  otpCreatedAt:String,
  otpCount:{type:Number, 
    default : 0,
  }
});

const AddBankSchema = new mongoose.Schema({
  userId:String,
  name: String,
  ifsc: String,
  bank_name: String,
  account: String,
  mobile:String,
  email:String,
  showBank:{type:Number,
  default:1
}
});


const otpModel = new mongoose.model("userotp",otpSchema);
const newSignupModel = new mongoose.model("Registration", newSignupShema);
const signupModel = new mongoose.model("users", signupSchema);
const AddBankModel = new mongoose.model("banks",AddBankSchema);
const PaymentModel = new mongoose.model("payments",PaymentSchema);

module.exports = {newSignupModel,signupModel,otpModel, AddBankModel,PaymentModel};