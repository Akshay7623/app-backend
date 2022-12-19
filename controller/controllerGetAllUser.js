const {signupModel}= require('../model/signupModel');

const GetAllUser = async(req,res,next)=>{
    const pageNumber = req.body.pageNumber;
    const userPerPage= req.body.userPerPage;
    const data = await signupModel.find().sort({userCreatedAt:1}).skip(pageNumber*userPerPage-userPerPage).limit(userPerPage);
    res.json(data);
}

module.exports = {GetAllUser};