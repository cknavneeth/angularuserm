const express = require('express');
const mongoose=require('mongoose')
const path=require('path')
const dotenv=require('dotenv')
const userRoutes=require('./routes/user')
const cors=require('cors')


dotenv.config({path:'.env'})
const app=express()
const PORT=process.env.PORT||3000

mongoose.connect(process.env.MONGO_URI,{

}).then(()=>console.log('database is connected'))
.catch((err)=>console.log(err))

console.log('PORT:', process.env.PORT);  // Check if the correct port is loaded
console.log('MONGO_URI:', process.env.MONGO_URI); 

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

app.use(cors({origin:'http://localhost:4200'}))
app.use('/',userRoutes)
 
app.listen(PORT,function(){
    console.log('server is in run')
})