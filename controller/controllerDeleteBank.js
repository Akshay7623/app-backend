const { AddBankModel } = require('../model/signupModel');
const DeleteBank = async(req,res,next)=>{
    const bankId = await req.body.id;
    const data = await AddBankModel.updateOne({_id:bankId},{showBank:0});
    if (data) {
        res.json({success:true});
    }else{
        res.json({success:false});
    }
}
module.exports = {DeleteBank};