const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

const router=express.Router()

router.get("/", function(req,res){

    res.send("Hello from user routes")
})

router.post("/signup",(req,res)=>{

    var newUser=new User({firstname:req.body.firstname, lastname:req.body.lastname, email:req.body.email, password:req.body.password, role:"user"})
    User.findOne({email:req.body.email}).exec().then(function(user){
         
        if(user){

         console.log("user exists")
         res.status(400).send({message:"User already exists"});

        }

        else{

            newUser.save().then(function(user){

                if(user){
        
                    res.status(200).send(user)
                }
                else{
        
                    res.status(500).send({message:"something went wrong while signup"})
                }
            })


        }


    }).catch( function(err){


        if(err){

            res.send(err)
        }
    })
    
    // var hashedPassword=bcrypt.hash(newUser.password,10);
    // newUser.password=hashedPassword
})

router.post('/login', (req,res)=>{

    User.findOne({email:req.body.email}).exec().then( function(user){
        
       if(user){

                if(user.password===req.body.password){

                    const token=jwt.sign({id:user._id,email:user.email},"testkey")

                    res.send({data:user,token:token})
                }
                else
                {

                    res.send("email or password wrong")
                }

            }
        else{

                res.send("user not found")
            }
        


    }).catch( function(err)
    {
        if(err)

        {
            res.send(err)
        
        }
    })
})

router.get("/allusers", function(req, res){

    User.find().then( function(users){

        if(users){

            res.send(users)
        }
        else{

            res.status(500).send("some thing went wrong while fetching users")
        }
    })

})


module.exports=router;