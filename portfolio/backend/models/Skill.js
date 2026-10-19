const mongoose=require("mongoose")

const skillSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    logo_url:{
        type:String,
        required:true
    },
    logo_public_id:{
        type:String,
        required:true
    },
    orderNo:{
        type:Number,
        required:true
    }
})
const Skill=mongoose.model("Skill",skillSchema)
module.exports=Skill