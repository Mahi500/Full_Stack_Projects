const mongoose=require("mongoose")

var schema=mongoose.Schema;

var UserLeaveSchema=new schema({

    username: {type:String},
    startDate:{type:String},
    endDate:{type:String},
    reason: {type:String},
    status:{type:String},
    leaveType:{type:String}
    
})

const UserLeaveModel=mongoose.model("UserLeaveModel",UserLeaveSchema);


module.exports=UserLeaveModel



