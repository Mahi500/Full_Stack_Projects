const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const userRoutes=require('./routes/userRoutes');
const userleaveRoutes=require('./routes/userleave');
const app=express();
app.use(cors());

app.use(express.json())
// app.use(express.urlencoded({extended:false}))

const mongodburl= "mongodb+srv://db_user:6CMxv38YIxmgcpK6@cluster0.ezjpukg.mongodb.net/?retryWrites=true&w=majority";



mongoose.connect(mongodburl,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("connected to database")}).catch((err)=>{console.error(err)})


app.use("/user",userRoutes);
app.use("/userleave",userleaveRoutes)

app.get("/", function(req,res){

    res.send("leave app server running")
})


app.listen(6001, function(){

    console.log("server running on port 6001");
})