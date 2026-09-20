const express=require("express")
const Detail= require("../models/Details")
const auth=require("../middlewares/auth")
const router=express.Router()

router.patch("/edit",auth,async(req,res)=>{
     try {
        const {mobile,email}=req.body
        const details = await Detail.updateOne({name:process.env.name},{mobile,email})
        res.status(200).json({
            status: true,
            message:"contact updated"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

module.exports=router