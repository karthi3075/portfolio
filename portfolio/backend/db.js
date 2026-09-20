const mongoose=require("mongoose")

const connectDB=()=>{
    try{
        mongoose.connect(process.env.mongo_url)
        console.log("db connected")
    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB