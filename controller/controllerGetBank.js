const {AddBankModel}= require('../model/signupModel');

const GetBank = async(req,res,next)=>{
    const id = req.body.id;
    const data = await AddBankModel.find({$and:[{userId:id},{showBank:1}]});
    res.json(data);
}

module.exports = {GetBank};