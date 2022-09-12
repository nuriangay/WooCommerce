const express=require('express')
const router=express.Router()
const controller=require('./order.controller')
const {protect}=require('../../middleware/authMiddleware')



router.post('/create-order',protect,controller.createOrder)
router.get('/my-orders',protect,controller.getMyOrders)
router.get('/all-orders',protect,controller.getAllOrders)
router.post('/mark-as-delivered/:orderId',protect,controller.markAsDelivered)


module.exports=router

