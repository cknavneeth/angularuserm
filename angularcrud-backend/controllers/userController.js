// const { generate } = require('rxjs')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');


function generateToken(userId){
    console.log('secret und',process.env.JWT_SECRET);
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:'2hr'
    })
}
exports.registerUser=async (req,res)=>{
console.log('controller is called')
    try {
        
        const {name,email,password,cpassword}=req.body

        console.log('got the data',{name,email,password,cpassword})

        
  
        let user=await User.findOne({email:email})
        console.log('parayi',user)
        if(user){
          return res.status(400).json({message:'This user already exists'})
        }
  
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
  
        const newUser=new User({
          name,
          email,
          password:hashedPassword,
        })
        console.log('helllo',newUser)
  
       const savedUser= await newUser.save()

       console.log('saved',savedUser)
  
       const token=generateToken(savedUser._id)
  
       console.log(token)
       return res.status(201).json({
          user:{
              id:savedUser._id,
              name,
              email,
              password:hashedPassword
          },
          token
       })
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({status:false,message:'internal server error'})
    }
}



exports.loginRegister=async(req,res)=>{
    console.log('login form is called')
    try {
        const {email,password} =req.body
        if(!email || !password){
            return res.status(400).json({status:false,message:'there is no email and password'})
        }

        let user=await User.findOne({email})
        if(!user){
            return res.status(500).json({message:'user not registered'})
        }

        const isValidPassword=await bcrypt.compare(password,user.password)
        console.log(isValidPassword);
        
        if(!isValidPassword){
            return res.status(500).json({message:'password is not valid'})
        }

        let token=generateToken(user._id)
        console.log('login token kittiyallo',token)
        return res.json({token,email})
    } catch (error) {
        console.log('errorrr',  error);
        
         return res.status(500).json({status:false,message:'internal server error'})
    }
}