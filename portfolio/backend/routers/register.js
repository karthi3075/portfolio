const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const User = require("../models/User")

const router=express.Router()

router.get("/register",async(req,res)=>{
    try{
        const email="karthi@gmail.com"
        const hashedPassword=await bcrypt.hash("karthi@nandha2005",10)
        const user=new User({
            email:email,
            password:hashedPassword
        })
        await user.save()
        res.status(200).json({message:"user registered"})
    }catch(error){
        console.log(error)
    }
})

module.exports=router
