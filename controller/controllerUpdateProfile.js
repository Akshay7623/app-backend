const {signupModel} = require('../model/signupModel');
const UpdateProfile = async (req,res,next)=>{
    const id = req.body.id;
    function validateEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
    if (!validateEmail(req.body.email)) {
        res.json({message:"INVALID_FORMAT"});
        return;
    }
    const update = await signupModel.updateOne({_id:id},{name:req.body.name,email:req.body.email});
    if (update) {
        res.json({success:true});
    }else{
        res.json({success:false});
    }
}
module.exports = {UpdateProfile};