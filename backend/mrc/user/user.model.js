const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false}
},{
    timestamps:true
})

const userModel=new mongoose.model('users',userSchema)

module.exports=userModel