const { AddBankModel } = require('../model/signupModel');
const DeleteBank = async(req,res,next)=>{
    const bankId = await req.body.id;
    const data = await AddBankModel.updateOne({_id:bankId},{showBank:0});
}
module.exports = {DeleteBank};