
const mongoose=require ('mongoose')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        default:'admin@gmail.com'
    },
    password:{
        type:String,
        required:false
    }
})
 


module.exports=mongoose.model('admin',adminSchema)