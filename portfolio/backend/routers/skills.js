const express=require("express")
const fs=require("fs")
const path=require("path")
const auth =require("../middlewares/auth")
const upload=require("../middlewares/upload")
const mongoose=require("mongoose")
const Skill=require("../models/Skill")

const router=express.Router()

router.post("/add",auth,upload.single("logo"),async(req,res)=>{
    try{
        const {category,skill,orderNo,prevLogo}=req.body
        // console.log(req.body)

        const data = new Skill({
            category,
            skill,
            logo:req.file.filename,
            orderNo
        })
        await data.save()
        res.status(201).json({
            status:true,
            message:"skill added"
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error
        })
    }
})

router.get("/view",auth,async(req,res)=>{
    try{
        const skills=await Skill.find()
        res.status(200).json({
            status:true,
            skills:skills
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error
        })
    }
})

router.get("/view/:id",auth,async(req,res)=>{
    try{
        const {id}=req.params
        const skill=await Skill.find({_id:id})
        res.status(200).json({
            status:true,
            skill:skill
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error
        })
    }
})

router.get("/show",async(req,res)=>{
    try{
        const skills=await Skill.aggregate([
            {
                $group:{
                    _id:"$category",
                    items:{
                        $push:"$$ROOT"
                    }
                }
            },
            {
                $addFields:{
                    order:{
                        $indexOfArray:[["Frontend","Backend","Tools & Technologies","Other Skills"],"$_id"]
                    }
                }
            },
            {
                $sort:{
                    order:1
                }
            },
            {
                $project:{
                    items:{
                        $sortArray:{
                            input:"$items",
                            sortBy:{orderNo:1}
                        }
                    }
                }
            }
        ])
        res.status(200).json({
            status:true,
            skills:skills
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error
        })
    }
})

router.patch("/edit",auth,upload.single("logo"),async(req,res)=>{
    try{
        const {id,category,skill,orderNo}=req.body
        const updateData={
            category,
            skill,
            orderNo
        }
        if(req.file){
            updateData.logo=req.file.filename
            const previousLogoPath=path.join(__dirname,"..","uploads",prevLogo)
            fs.unlinkSync(previousLogoPath)
            
        }
        await Skill.updateOne({_id:id},updateData)
        res.status(200).json({
            status:true,
            message:"skill edited"
        })
    }catch(error){
        res.status(500).json({
            status:false,
            message:error
        })
    }
})

router.delete("/delete/:id",auth,async(req,res)=>{
    try{
        const {id}=req.params
        const skill=await Skill.findById(id)
        const prevLogoPath=path.join(__dirname,"..","uploads",skill.logo)
        fs.unlinkSync(prevLogoPath)
        await Skill.findByIdAndDelete(id)
        res.status(200).json({
            status:true,
            message:"skill deleted"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:false,
            message:error
        })
    }
})



module.exports=router