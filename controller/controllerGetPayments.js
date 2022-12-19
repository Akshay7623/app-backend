const {PaymentModel}= require('../model/signupModel');

const GetPayments = async(req,res,next)=>{
    const pageNumber = req.body.pageNumber;
    const userPerPage= req.body.userPerPage;
    const paid = req.body.paid;
    const data = await PaymentModel.find({isPaid:paid}).sort({paymentCreatedAt:1}).skip(pageNumber*userPerPage-userPerPage).limit(userPerPage);
    res.json(data);
}

module.exports = {GetPayments};