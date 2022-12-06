const {PaymentModel}= require('../model/signupModel');

const History = async(req,res,next)=>{
    const id = req.body.id;
    const data = await PaymentModel.find({userId:id});
    res.json(data);
}

module.exports = {History};