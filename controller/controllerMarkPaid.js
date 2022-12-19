const {PaymentModel}= require('../model/signupModel');

const MarkPaid = async(req,res,next)=>{

    const paymentId =  req.body.id;
    const data = await PaymentModel.updateOne({_id:paymentId},{"isPaid":1});
    res.json(data);
}

module.exports = {MarkPaid};