const mongoose=require("mongoose")

const projectSchema=new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    projectImg:{
        type:String,
        required:true
    },
    liveLink:{
        type:String,
        required:false
    },
    gitLink:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:true
    }
})
const Project=mongoose.model("Project",projectSchema)
module.exports=Project