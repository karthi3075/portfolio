const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth=require("../middlewares/auth")
const transporter = require("../config/mail")

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(200).json({
                status:false,
                message: "email not found"
            })
        }

        const isLogin = await bcrypt.compare(password, user.password)

        if (!isLogin) {

            return res.status(200).json({
                status:false,
                message: "incorrect password"
            })
        }
        const token = jwt.sign(
            { name: process.env.name },
            process.env.jwt_secret,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            status:true,
            message:"login success"
        })

    } catch (error) {
        res.status(404).json({
            status:false,
            message: error
        })
    }
})

router.get("/me",auth, (req, res) => {
    return res.status(200).json({
        status: true,
        user: req.user
    })
})

router.post("/logout", auth, (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    return res.status(200).json({
        status: true,
        message: "logout success"
    })
})

router.post("/send-message",async (req,res)=>{
    try{
        const {name,email,subject,message}=req.body
        await transporter.sendMail({
            from:process.env.email,
            to:process.env.email,
            replyTo:email,
            subject:subject,
            text:`my name is ${name} my email id is: ${email} this message from your portfolio your message content is: ${message}`
        })
        res.status(200).json({
            status:true,
            message:"mail send successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            status:false,
            message:"mail not send"
        })
    }
})
module.exports = router
