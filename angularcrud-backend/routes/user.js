
const express=require('express')

const forUser=require('../controllers/userController')

//space for requiring controllers

const userroutes=express.Router()

userroutes.post('/signup',forUser.registerUser)

userroutes.post('/login',forUser.loginRegister)



module.exports=userroutes