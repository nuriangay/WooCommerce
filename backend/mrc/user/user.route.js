const express=require('express')
const {body,param}=require('express-validator')
const controller=require('./user.controller')
const router=express.Router()
const {protect}=require('../../middleware/authMiddleware')

router.post('/register',[

    body('fullName').exists().isString().trim(),
    body('email').exists().isEmail().trim(),
    body('password').exists().isString().trim().isLength({min:8,max:20}).withMessage('Must be between 8-20 characters')
],controller.register)

router.post('/login',[

   
    body('email').exists().isEmail().trim(),
    body('password').exists().isString().trim().isLength({min:8,max:20}).withMessage('Must be between 8-20 characters')
],controller.login)

router.get('/:userId',[
    param('userId').exists()
],protect,controller.getUser)

router.post('/:userId',[
    body('fullName').exists().isString(),
    body('email').exists().isEmail(),
    param('userId').exists()
],protect,controller.updateProfile)

router.get('/',protect,controller.getAllUsers)
router.delete('/delete-user/:userId',protect,controller.deleteUser)

module.exports=router