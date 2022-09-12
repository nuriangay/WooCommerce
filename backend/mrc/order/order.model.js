const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userData:{type:Object,required:true},
    cartItems:{type:Array,required:true},
    shippingDetails:{type:Object,required:true},
    totalPrice:{type:String,required:true},
    isDelivered:{type:Boolean,required:true,default:false}
    


},{
    timestamps:true
})

const orderModel=new mongoose.model('orders',orderSchema)

module.exports=orderModel