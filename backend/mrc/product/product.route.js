const express=require('express')
const router=express.Router()
const multer = require('multer')

const { fileFilter, getFileStorage } = require('../../utils/fileMethod')
const {protect}=require('../../middleware/authMiddleware')
const controller=require('./product.controller')

const upload = multer({
	storage: getFileStorage(),
	fileFilter,
	limits: { fileSize: 2097152 },
})

router.put('/upload-image/:productId', protect, upload.single('image'), controller.uploadImage)
router.post('/add-product',protect,controller.addProduct)
router.get('/all-products',protect,controller.allProducts)
router.get('/:productId',protect,controller.productById)
router.post('/edit-product/:productId',protect,controller.editProduct)
router.delete('/delete-product/:productId',protect,controller.deleteProduct)
router.get('/main-page/all-products',controller.AllProducts)
module.exports=router

