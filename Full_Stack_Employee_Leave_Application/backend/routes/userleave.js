const express = require('express');
const router = express.Router();
const userLeaveModel = require('../models/userleave');


router.post("/applyleave", function (req, res) {


    var userLeave = new userLeaveModel({
        reason: req.body.reason,
        status: "Pending",
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        username: req.body.username,
        leaveType: req.body.leaveType
    });

    var { reason, status, startDate, endDate, username, type } = req.body;

    var userleave = new userLeaveModel({ reason, status, startDate, endDate, username, type })

    userLeave.save().then( function (user){

     if(user){

        console.log(user);
        res.send(user)
     }
     else{

        res.status(500).send("some thing went wrong while applying leave");
     }

})

router.get("/:username/myleave", function(req,res){

    userLeaveModel.find({username:req.params.username}).then(function(leaves){

        if(leaves){
            
            res.send(leaves)
        }
        else
        {
            res.status(500).send("some thing went wrong while fetching leaves")
        }
    })

})

router.get("/allleaves", function(req, res){

       userLeaveModel.find().then(function(leaves){

           if(leaves){

            console.log(leaves)
            res.send(leaves)

           }
           else{

            res.status(500).send("some thing went wrong while fetching leaves")

           }

       })
})


router.put("/:leaveid/approve", function(req,res){

    userLeaveModel.findByIdAndUpdate(req.params.leaveid,{status:req.body.status}).then(function(leave){

        if(leave){

            res.send(leave)
        }
        else
        {
            res.status(500).send("error while approving the leave")
        }

    })


})

})

module.exports=router;