const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const path=require("path")
const connectDB=require("./db")
dotenv.config()
const register = require("./routers/register")
const api = require("./routers/api")
const skills =require("./routers/skills")
const details=require("./routers/details")
const contact=require("./routers/contact")
const about=require("./routers/about")
const landing=require("./routers/landing")
const projects=require("./routers/projects")
const app=express()
connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:process.env.frontend_url,
    credentials:true
}))

app.use("/admin",register)
app.use("/admin",api)
app.use("/details",details)
app.use("/landing",landing)
app.use("/skills",skills)
app.use("/contact",contact)
app.use("/about",about)
app.use("/projects",projects)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(3000,()=>{
    console.log("server is running")
})