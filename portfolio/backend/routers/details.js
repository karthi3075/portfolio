const express = require("express")
const path=require("path")
const router = express.Router()
const Detail = require("../models/Details")
const auth=require("../middlewares/auth")

router.get("/register",async(req,res)=>{
    try {
        const details=new Detail({
            name:process.env.name,
            fname:"Karthi",
            lname:"J",
            role:"Full Stack Developer",
            linkedin:"www.google.com",
            github:"www.google.com",
            resume:"karthi_photo.jpg",
            photo:"karthi_photo.jpg",
            description:"I build modern, responsive and user-friendly web applications with clean code and great UX.",
            aboutDescription:"I am a curious and driven Full Stack Developer who enjoys building elegant, efficient and user-friendly web applications, I love turning ideas into real products that solve problems and create value.",
            aboutImg:"karthi_photo.jpg",
            mobile:9123557302,
            email:"karthijayakumar3007@gmail.com"
        })
        await details.save()
        res.status(201).json({
            status: true,
            message:"data inserted"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.get("/view", async (req, res) => {
    try {
        const details = await Detail.find()
        res.status(200).json({
            status: true,
            details:details
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.post("/download",(req,res)=>{
    try{
        const {resume}=req.body
        console.log("file will be doenloaded")
        console.log(resume)
        const filePath=path.join(process.cwd(),"uploads",resume)
        console.log(filePath)
        return res.download(filePath,resume,(err)=>{
            if(err){
                console.log(err.message)
            }
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

module.exports = router