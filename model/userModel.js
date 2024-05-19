const mongoose=require("mongoose")


const signupSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:3,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:50,
    },
    password:{
        type:String,
        unique:true,
        required:true,
        max:15,
    }
})

module.exports=mongoose.model("SignedUsers",signupSchema);