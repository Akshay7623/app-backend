const {AddBankModel} = require('../model/signupModel');
const GetAllBanks = async(req,res,next)=>{
    const pageNumber = req.body.pageNumber;
    const userPerPage = req.body.userPerPage;
    const data = await AddBankModel.find({showBank:1}).sort({AddedBankAt:1}).skip(pageNumber*userPerPage-userPerPage).limit(userPerPage);
    res.json(data);

}


module.exports = {GetAllBanks};