const { AddBankModel,signupModel} = require('../model/signupModel');

const AddUpi = async (req,res,next)=>{
    const id =req.body.id;
    const isAvail = await signupModel.findOne({_id:id});
    const user = req.body;
    if (isAvail) {
        const account = req.body.account;
        const ifsc = req.body.ifsc;
        const isBankAvail = await AddBankModel.findOne({$and: [{account:account}, {ifsc:ifsc},{showBank:1}]}, );
        const countBank = await AddBankModel.find({$and:[{userId:id},{showBank:1}]}).count();
        if (countBank===4) {
            res.json({message:"LIMIT"});
            return;
        }
        if (isBankAvail) {
            res.json({message:"DATA_EXIST"});
        }else{
            const time = new Date().getTime();
            const data = AddBankModel({userId:id.trim(),name:user.name.trim(),account:user.upi.trim(),mobile:user.mobile.trim(),email:user.email.trim(),AddedBankAt:time,accountType:"upi" });
            const result = await data.save();
            if (result) {
                res.json({message:"SUCCESS"});
            }else{
                res.json({message:"SERVER_ERROR"});
            }
        }
    }else{
        res.json({message:"USER_NOT_FOUND",auth:false});
    }


}

module.exports = {AddUpi};