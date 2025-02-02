
const Admin=require('../models/admin')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.adminLogin=async(req,res)=>{
    console.log('admin login avan sremikkunnu')
    try {
        console.log(req.body);  
        
        const {email,password}=req.body
        const isAdmin=await Admin.findOne({email:email})
        if(!isAdmin){
            return res.status(400).json({success:false,message:'invalid email ahn'})
        }
        const isPassword= await bcrypt.compare(password,isAdmin.password)
        if(!isPassword){
            return res.status(400).json({success:false,message:'password is not valid'})
        }
        const token=jwt.sign({id:isAdmin._id},process.env.JWT_SECRET,{
            expiresIn:'2h'
        })
        console.log(token);
        
        return res.status(200).json({
            token
        })
    } catch (error) {
        return res.status(400).json({success:false,error:'server error'})
    }
}


exports.getallusers=async(req,res)=>{
    try {
        const users=await User.find()
        return res.status(200).json({users})
    } catch (error) {
        return res.status(500).json({success:false,message:'something wrong occured'})
    }
}


exports.addusers=async(req,res)=>{
    console.log('admin add akan nokkanid')
    try {
        const {name,email,password,confirmPassword}=req.body
        console.log(req.body)

        // if (password !== confirmPassword) {
        //     return res.status(400).json({ success: false, message: 'Passwords do not match' });
        // }

        const user=await User.findOne({email:email})
        if(user){
            console.log('user exists')
            return res.status(400).json({success:false,message:'This email already exists'})
        }

        const salt=10
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        console.log('ippo add avm')
        await newUser.save()

        console.log(newUser,'puthiya aaala')

        const currentUser=await User.findOne({email:email})
        return res.status(200).json({currentUser})
        
    } catch (error) {
        return res.status(500).json({success:false,message:'entho patti'})
    }
}



exports.editUser=async(req,res)=>{
    console.log('miraaaa')
    try {
        console.log('edit cheyyan olla call backil vannu')
        const {_id,email,password,name}=req.body
        console.log(req.body,'kittitund')

        const updateUser=await User.findByIdAndUpdate(_id,{
            name,
            email,
            password
        },{new:true})

        if(!updateUser){
            return res.status(400).json({success:false,message:'user not found'})
        }
        res.json(updateUser)
        } catch (error) {
        
            return res.status(500).json({success:false,message:"something went wrong"})
    }
}


exports.deleteUser=async(req,res)=>{
    try {
        const {email}=req.body
        console.log(email)
        if(!email){
            return res.status(400).json({success:false,message:'email not found'})
        }

        const removedUser=await User.findOneAndDelete({email})
        if(removedUser){
            return res.status(200).json({removedUser})
        }else{
            return res.status(400).json({success:false,message:'user not found'})
        }
    } catch (error) {
        return res.status(500).json({success:false,message:'something went wrong'})
    }
}