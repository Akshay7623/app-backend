const {signupModel} = require('../model/signupModel');
const UpdateProfile = async (req,res,next)=>{
    const id = req.body.id;
    const update = await signupModel.updateOne({_id:id},{name:req.body.name,email:req.body.email});
    if (update) {
        res.json({success:true});
    }else{
        res.json({success:false});
    }
}
module.exports = {UpdateProfile};