const express = require("express")
const fs = require("fs")
const path = require("path")
const Detail = require("../models/Details")
const auth = require("../middlewares/auth")
const upload = require("../middlewares/upload")
const router = express.Router()
const cloudinary = require("../config/cloudinary")

router.patch("/edit", upload.fields([{ name: "photo", maxCount: 1 }, { name: "resume", maxCount: 1 }]), auth, async (req, res) => {
    try {
        const { fname, lname, role, linkedin, github, description, prevPhoto, prevResume } = req.body
        const updateData = {
            fname,
            lname,
            role,
            linkedin,
            github,
            description,
        }

        if (req.files.resume) {
            const resume = req.files.resume[0]

            if (resume.mimetype !== "application/pdf") {
                return res.status(400).json({
                    status: false,
                    message: "Please upload a PDF file"
                });
            }

            const resumeResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    resource_type: "raw",
                    folder: "documents",
                    public_id: `${(Date.now() + 1).toString()}.pdf`,
                    format: "pdf"
                }, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
                stream.end(resume.buffer)
            })
            const result = await cloudinary.uploader.destroy(prevResume, { resource_type: "raw" })
            updateData.resume_url = resumeResult.secure_url
            updateData.resume_public_id = resumeResult.public_id
        }
        if (req.files.photo) {
            const image = req.files.photo[0]
            const imageResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    resource_type: "image",
                    folder: "images",
                    public_id: (Date.now()).toString()
                }, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
                stream.end(image.buffer)
            })
            const result = await cloudinary.uploader.destroy(prevPhoto, { resource_type: "image" })
            updateData.photo_url = imageResult.secure_url
            updateData.photo_public_id = imageResult.public_id
        }
        const details = await Detail.updateOne({ name: process.env.name }, updateData)
        res.status(200).json({
            status: true,
            message: "landing page updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

module.exports = router