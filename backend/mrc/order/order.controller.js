const Order=require('./order.model')
const User=require('../user/user.model')
const {checkValidationError}=require('../../utils/utils')



const stripe=require('stripe')('sk_test_51LaxrbEJrk733tyPdjgxkB3dvkiyW9zJLJdMqHncyAafFAGR7ZPrPwLr1esERlrMMSfjujyWMLfWHTPpJP4hwuNx00fmR1n4mf')
const {v4:uuidv4} = require('uuid')

const createOrder=async(req,res,next)=>{
    const {userData,cartItems,shippingDetails,totalPrice,token}=req.body
    try {
        checkValidationError(req)

      
        const customer=await stripe.customers.create({email:token.email,source:token.id})

        const payment=await stripe.charges.create(
            {
            amount:totalPrice * 100,
            customer:customer.id,
            currency:'USD',
            receipt_email:token.email
        },
        {
            idempotencyKey:uuidv4()
        }
        )

        if(payment){
            const newOrder= new Order({
                userData,cartItems,shippingDetails,totalPrice
            })
           await newOrder.save()

            res.status(200).send({success:true,msg:'Your order is created successfully',newOrder})
        }
      
    } catch (error) {
        next(error)
    }
}

const getMyOrders=async(req,res,next)=>{
    try {
        checkValidationError(req)

        const myOrders=await Order.find({'userData.id':req.userId})

        res.status(200).send({success:true,msg:'My orders fetched',data:myOrders})
    } catch (error) {
        next(error)
    }

}

const getAllOrders=async(req,res,next)=>{
    try {
        checkValidationError(req)

        const adminUser=await User.findOne({_id:req.userId})

    

            if(adminUser.isAdmin.toString()==='true'){
                const allOrders=await Order.find({})

                res.status(200).send({success:true,data:allOrders})
                 
            }else{
                const error=new Error('Not authenticated as admin')
                error.statusCode=401
                throw error
               
            }
        
       

    } catch (error) {
        next(error)
    }

}

const markAsDelivered=async(req,res,next)=>{
   

    try {
        checkValidationError(req)
        
        const admin=await User.findOne({_id:req.userId})

    if(admin.isAdmin.toString()==='true'){
        const order=await Order.findOne({_id:req.params.orderId})

       order.isDelivered=true

       res.status(200).send({success:true,msg:'Order marked as delivered'})
       await order.save()
    }else{
        const error=new Error('Not authenticated as admin')
        error.statusCode=401
        throw error
    }
    } catch (error) {
        next(error)
    }
}

module.exports={createOrder,getMyOrders,getAllOrders,markAsDelivered}