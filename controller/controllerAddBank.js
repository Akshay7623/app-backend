const { AddBankModel,signupModel} = require('../model/signupModel');

const AddBank = async (req,res,next)=>{
    const id =req.body.id;
    const isAvail = await signupModel.findOne({_id:id});
    const user = req.body;
    if (isAvail) {
        const account = req.body.account;
        const ifsc = req.body.ifsc;
        const isBankAvail = await AddBankModel.findOne({$and: [{account:account}, {ifsc:ifsc},{showBank:1}]} );
        if (isBankAvail) {
            res.json({message:"DATA_EXIST"});
        }else{
            const data = AddBankModel({userId:id.trim(),name:user.name.trim(),ifsc:user.ifsc.trim(),bank_name:user.bank_name.trim(),account:user.account.trim(),mobile:user.mobile.trim(),email:user.email.trim() });
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


    // const UserBank = req.body;
    // const data = await AddBankModel({UserBank});
    // const result = await data.save();
    // console.log(result);

}

module.exports = {AddBank};