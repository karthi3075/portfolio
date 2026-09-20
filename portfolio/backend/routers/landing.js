const express=require("express")
const fs=require("fs")
const path=require("path")
const Detail= require("../models/Details")
const auth=require("../middlewares/auth")
const upload=require("../middlewares/upload")
const router=express.Router()

router.patch("/edit",upload.fields([{name:"photo",maxCount:1},{name:"resume",maxCount:1}]),auth,async(req,res)=>{
     try {
        const {fname,lname,role,linkedin,github,description,prevPhoto,prevResume}=req.body
        const updateData={
            fname,
            lname,
            role,
            linkedin,
            github,
            description,
        }

        if(req.files.resume){
            updateData.resume=req.files.resume[0].filename
            const previousResumePath=path.join(__dirname,"..","uploads",prevResume)
            fs.unlinkSync(previousResumePath)
        }
        if(req.files.photo){
            updateData.photo=req.files.photo[0].filename
            const previousImgPath=path.join(__dirname,"..","uploads",prevPhoto)
            fs.unlinkSync(previousImgPath)
        }
        const details = await Detail.updateOne({name:process.env.name},updateData)
        res.status(200).json({
            status: true,
            message:"landing page updated"
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

module.exports=router