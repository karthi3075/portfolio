const express=require("express")
const fs=require("fs")
const path=require("path")
const Detail= require("../models/Details")
const auth=require("../middlewares/auth")
const upload=require("../middlewares/upload")
const router=express.Router()

router.patch("/edit",auth,upload.single("aboutImg"),async(req,res)=>{
     try {
        const {aboutDescription,prevImg}=req.body
        const updateData={
            aboutDescription
        }
        if(req.file){
            updateData.aboutImg=req.file.filename
            const previousImgPath=path.join(__dirname,"..","uploads",prevImg)
            fs.unlinkSync(previousImgPath)
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