const { signupModel } = require('../model/signupModel');

const ShowProfile = async(req,res,next)=>{
    const id = req.body.id;
    const data = await signupModel.find({_id:id}).select("-password").select("-_id").select("-userCreatedAt");
    res.json(data);
}
module.exports = {ShowProfile};