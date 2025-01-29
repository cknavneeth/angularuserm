
const express=require('express')

const foradmin=require('../controllers/adminController')
const adminroot=express.Router()

adminroot.post('/login',foradmin.adminLogin)

adminroot.get('/dashboard',foradmin.getallusers)

adminroot.post('/adduser',foradmin.addusers)

module.exports=adminroot