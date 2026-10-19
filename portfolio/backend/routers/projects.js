const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")
const auth = require("../middlewares/auth")
const upload = require("../middlewares/upload")
const Project = require("../models/Project")
const cloudinary = require("../config/cloudinary")

router.post("/add", auth, upload.single("projectImg"), async (req, res) => {
    try {
        const { projectName, liveLink, gitLink, description } = req.body
        // console.log(req.body)
        const projectImg = req.file
        const imageResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: "projects",
                public_id: Date.now().toString()
            }, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
            stream.end(projectImg.buffer)
        })
        const project = new Project({
            projectName,
            projectImg_url: imageResult.secure_url,
            projectImg_public_id: imageResult.public_id,
            liveLink,
            gitLink,
            description
        })
        await project.save()
        res.status(201).json({
            status: true,
            message: "project added"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.get("/view", async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).json({
            status: true,
            projects: projects
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.find({ _id: id })
        res.status(200).json({
            status: true,
            project: project
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.patch("/edit", auth, upload.single("projectImg"), async (req, res) => {
    try {
        const { projectName, liveLink, gitLink, description, id, prevProjectImg } = req.body
        const updateData = {
            projectName,
            liveLink,
            gitLink,
            description
        }
        if (req.file) {
            const projectImg = req.file
            const imageResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    resource_type: "image",
                    folder: "skills",
                    public_id: Date.now().toString()
                }, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
                stream.end(projectImg.buffer)
            })
            const result = await cloudinary.uploader.destroy(prevProjectImg, { resource_type: "image" })
            updateData.projectImg_url = imageResult.secure_url
            updateData.projectImg_public_id = imageResult.public_id

        }
        const details = await Project.updateOne({ _id: id }, updateData)
        res.status(200).json({
            status: true,
            message: "projects updated"
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            status: false,
            message: error
        })
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        const result=await cloudinary.uploader.destroy(project.projectImg_public_id,{resource_type:"image"})
        await Project.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "project deleted"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error
        })
    }
})


module.exports = router