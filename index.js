const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const userRouter=require("./routes/userRoutes")
const app=express()
const port=5000 

app.use(express.json())
app.use(cors())
app.use("/auth/",userRouter)

mongoose.connect("mongodb+srv://ShivaPatel:mern@shivapatel.z9rhive.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("DB Connected!")
})
.catch((err)=>{
    console.log(err.message)
})
app.listen(5000,()=>console.log("Port is runnning at 5000"))