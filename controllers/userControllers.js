const userObject=require("../model/userModel")
const bcrypt=require("bcrypt")

module.exports.signup=async (req,res,next)=>{
    try{
        const {username,password,email}=req.body;
        const authenticateUser=await userObject.findOne({username});
        const authenticateEmail=await userObject.findOne({email});

        if(authenticateUser){
            return res.json({message:"Username Already Exists",status:false});   
        }
        if(authenticateEmail){
            return res.json({message:"Email already exists",status:false})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await userObject.create({
            email,username,password:hashedPassword
        })
        delete user.password;
        return res.json({status:true,user})
    }
    catch(err){
       next(err)
    }
}

module.exports.login= async (req,res,next)=>{
    try{
        const {username,password}=req.body;
        const authenticateLoginUser=await userObject.findOne({username});
        

        if (!authenticateLoginUser){
            return res.json({message:"Incorrect username",status:false});
        }
        const authenticatePassword=await bcrypt.compare(password,authenticateLoginUser.password)
        if(!authenticatePassword){
            return res.json({message:"Incorrect Password",status:false})
        }
        delete authenticateLoginUser.password;
        return res.json({status:true,authenticateLoginUser})
    }
    catch(err){
        next(err)
    }
}