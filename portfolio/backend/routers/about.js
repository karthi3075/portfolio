const express=require("express")
const fs=require("fs")
const path=require("path")
const Detail= require("../models/Details")
const auth=require("../middlewares/auth")
const upload=require("../middlewares/upload")
const router=express.Router()
const cloudinary=require("../config/cloudinary")

router.patch("/edit",auth,upload.single("aboutImg"),async(req,res)=>{
     try {
        const {aboutDescription,prevImg}=req.body
        const updateData={
            aboutDescription
        }
        if(req.file){
            const aboutImg=req.file
            const aboutImgResult=await new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream({
                    resource_type:"image",
                    folder:"images",
                    public_id:Date.now().toString()
                },(error,result)=>{
                    if(error){
                        reject(error)
                    }else{
                        resolve(result)
                    }
                })
                stream.end(aboutImg.buffer)
            })
            const result=await cloudinary.uploader.destroy(prevImg,{resource_type:"image"})
            updateData.aboutImg_url=aboutImgResult.secure_url
            updateData.aboutImg_public_id=aboutImgResult.public_id
        }
        const details = await Detail.updateOne({name:process.env.name},updateData)
        res.status(200).json({
            status: true,
            message:"about updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

module.exports=router