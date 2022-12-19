const {signupModel,AddBankModel,PaymentModel} = require('../model/signupModel');
const AllData = async(req,res,next) =>{
    const userNumber = await signupModel.count();
    const BankNumber = await AddBankModel.count({showBank:1});
    const DeletedBank =  await AddBankModel.count({showBank:0});
    const CompletedPay = await PaymentModel.count({isPaid:1});
    const RemainPay = await PaymentModel.count({isPaid:0});
    res.json({totalUser:userNumber,activeBank:BankNumber,DeletedBank :DeletedBank,paymentCompleted:CompletedPay,remainPay:RemainPay});
}

module.exports = {AllData};