const {signupModel} = require('../model/signupModel');
const SearchUser = async(req,res,next)=>{
    const search = req.body.search;
    const pageNumber =  req.body.pageNumber;
    const userPerPage = req.body.userPerPage;
    const data = await signupModel.find({ $or: [{ name: { $regex: search } }, { mobile: { $regex: search } }, { email: { $regex: search } }, ]}).sort({ userCreatedAt: 1 }).skip(pageNumber*userPerPage-userPerPage).limit(userPerPage);
    res.json(data);
}
module.exports = {SearchUser};