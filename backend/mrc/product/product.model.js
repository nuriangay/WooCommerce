const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    userId:{type:String},
    name:{type:String,required:true},
    image:{type:String},
    brand:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    countInStock:{type:Number,required:true},
})


const productModel=new mongoose.model('products',productSchema)

module.exports=productModel