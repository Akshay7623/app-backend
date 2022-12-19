require('dotenv').config()
require('./config');
const express = require('express');
const cors = require("cors");
const path = require("path");
const signupRoute = require("./routes/routeSignup");
const loginRoute = require('./routes/routeLogin');
const recordRoute = require('./routes/routeRecord');
const submitOtpRoute = require('./routes/routeSubmitOtp');
const authRoute = require('./routes/routeAuth');
const resendRoute = require('./routes/routeResend');
const forgotpassRoute = require('./routes/routeForgotpass');
const resetPassRoute = require('./routes/routesendResetOtp');
const submitResetOtpRoute = require('./routes/routeSubmitResetOtp');
const authResetRoute = require('./routes/routeAuthReset');
const submitResetPassRoute = require('./routes/routeSubmitResetPass.js');
const routeResendOtp = require('./routes/routeResendOtp.js');
const AddBank = require('./routes/routeAddBank.js');
const AddUpi = require('./routes/routeAddUpi.js');
const showBank = require('./routes/routeshowBank.js');
const DeleteBank = require('./routes/routeDeleteBank.js');
const ShowProfile =  require('./routes/routeShowProfile');
const UpdateProfile =  require('./routes/routeUpdateProfile.js');
const ChangePassword = require('./routes/routeChangePassword');
const paymentRoutes = require("./routes/payment");
const GetBanks = require('./routes/routeGetBanks.js');
const History = require('./routes/routeHistory.js');
const AdminLogin = require('./routes/routesAdminLogin.js');
const AuthAdmin = require('./routes/routeAuthAdmin');
const GetAllUser = require('./routes/routeGetAllUser');
const GetPayments = require('./routes/routeGetPayment.js');
const SearchPayment =  require('./routes/routeSearchPayment.js');
const MarkPaid = require('./routes/routeMarkPaid.js');
const AllData = require('./routes/routeAllData.js');
const GetAllBank = require('./routes/routeGetAllBanks.js');
const SearchUser = require('./routes/routeSearchUser.js');
const RazorpayWebhook = require('./routes/razorpaywebhook.js');


const app = express();
app.use(express.json());
app.use(cors());
app.use('/showbank',showBank);
app.use('/signup',signupRoute);
app.use('/login',loginRoute);
app.use('/recordavail',recordRoute);
app.use('/submitotp',submitOtpRoute);
app.use('/auth',authRoute);
app.use('/resendotp',resendRoute);
app.use('/forgotpass',forgotpassRoute);
app.use('/sendresetotp',resetPassRoute);
app.use('/submitresetotp',submitResetOtpRoute);
app.use('/authreset',authResetRoute);
app.use('/submitresetpass',submitResetPassRoute);
app.use('/resendotppass',routeResendOtp);
app.use('/addbank',AddBank);
app.use('/addupi',AddUpi);
app.use('/deletebank',DeleteBank);
app.use('/showprofile',ShowProfile);
app.use('/updateprofile',UpdateProfile);
app.use('/getbanks',GetBanks);
app.use('/changepassword',ChangePassword);
app.use("/api/payment/", paymentRoutes);
app.use("/history",History);

app.use("/admin/login",AdminLogin);
app.use("/admin/authadmin",AuthAdmin);
app.use("/admin/getalluser",GetAllUser);
app.use("/admin/getpayments",GetPayments);
app.use("/admin/searchpayment",SearchPayment);
app.use("/admin/searchuser",SearchUser);
app.use("/admin/getallbank",GetAllBank);
app.use("/admin/markpaid",MarkPaid);
app.use("/admin/alldata",AllData);
app.use("/razorpay/webhook",RazorpayWebhook);

app.use(express.static(__dirname + '/build'));
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is running on htpp://localhost:${PORT}`);
  });