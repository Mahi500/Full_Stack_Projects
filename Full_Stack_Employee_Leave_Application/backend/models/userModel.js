const mongoose=require('mongoose');


var userSchema= new mongoose.Schema(

    {
        firstname:{type:String, required: true},
        lastname:{type:String, required: true},
        email:{type:String},
        password:{type:String},
        leaveCount: {type:Number, default:15},
        role:{type:String}
    }
)

const userModel=mongoose.model("userModel",userSchema);

module.exports=userModel



