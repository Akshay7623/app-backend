const { PaymentModel} = require('../model/signupModel');

const SearchPayment = async(req,res,next)=>{

    const search = req.body.search;
    const pageNumber = req.body.pageNumber;
    const userPerPage= req.body.userPerPage;
    const data = await PaymentModel.find({$or:[{name: {'$regex': search}},{mobile: {'$regex': search}},{bank_account: {'$regex': search}},{ifsc:{'$regex':search}},{orderId:{'$regex':search}}]}).sort({paymentCreatedAt:1}).skip(pageNumber*userPerPage-userPerPage).limit(userPerPage)
    res.json(data);

} 

module.exports = {SearchPayment};