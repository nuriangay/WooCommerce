const Product=require('../product/product.model')
const User=require('../user/user.model')
const { clearImage } = require('../../utils/fileMethod')
const {checkValidationError}=require('../../utils/utils')



const uploadImage = async (req, res, next) => {
	try {
		const productId = req.params.productId
		const product = await Product.findById(productId)

		if (req.file) {
			clearImage(product.image)
			product.image = `/products/${req.file.filename}`
		}

		await product.save()

		res.status(201).json({
			image: product.image,
		})
	} catch (error) {
		next(error)
	}
}

const addProduct=async(req,res,next)=>{
    try {
        checkValidationError(req)
      const admin=await User.findOne({_id:req.userId})

      if(admin.isAdmin.toString()==='true'){
          
        const {name,userId,brand,category,countInStock,description,price}=req.body

        const newProduct=new Product({
            name,userId,brand,category,countInStock,description,price
        })

        await newProduct.save()

        res.status(200).send({success:true,msg:'Product created successfully',newProduct})

      }else{
        const error=new Error('Not authenticated as admin')
        error.statusCode=401
        throw error
      }
        
    } catch (error) {
        next(error)
    }

}

const allProducts=async(req,res,next)=>{
  try {
    checkValidationError(req)
    const admin=await User.findOne({_id:req.userId})

    if(admin.isAdmin.toString()==='true'){
      const products=await Product.find({})

      res.status(200).send({success:true,data:products})
    }else{
      const error=new Error('Not authenticated as admin')
      error.statusCode=401
      throw error
    }
  } catch (error) {
    next(error)
  }
}
const productById=async(req,res,next)=>{
  try {
    checkValidationError(req)
    const admin=await User.findOne({_id:req.userId})

    if(admin.isAdmin.toString()==='true'){
      const product=await Product.findById(req.params.productId)

      res.status(200).send({success:true,product})
    }else{
      const error=new Error('Not authenticated as admin')
      error.statusCode=401
      throw error
    }
  } catch (error) {
    next(error)
  }
}

const editProduct=async(req,res,next)=>{
  const {name,price,category,description,countInStock,brand}=req.body
  try {
    checkValidationError(req)
    const admin=await User.findOne({_id:req.userId})

    if(admin.isAdmin.toString()==='true'){
      const product=await Product.findByIdAndUpdate(req.params.productId,{name,price,category,description,countInStock,brand})

        await product.save()
      res.status(200).send({success:true,msg:'Product updated successfully'})
    }else{
      const error=new Error('Not authenticated as admin')
      error.statusCode=401
      throw error
    }
  } catch (error) {
    next(error)
  }
}

const deleteProduct=async(req,res,next)=>{
  try {
    checkValidationError(req)
    const user=await User.findOne({_id:req.userId})

    if(user.isAdmin.toString()==='true'){
      const product=await Product.findById(req.params.productId)

     product.remove()

     await product.save()

     res.status(200).send({msg:'Product deleted successfully',success:true})




    }else{
      const error=new Error('Not authenticated as admin')

      error.statusCode=401
      throw error
    }
  } catch (error) {
    next(error)
  }

}

const AllProducts=async(req,res,next)=>{

  const {search,sort,category}=req.query
  try {
    checkValidationError(req)

   
      const product=await Product.find({
      // $and:[{name:{$regex:search,$options:'i'}},{category:{$regex:category,$options:'i'}}],
      // $and:[{brand:{$regex:search,$options:'i'}},{category:{$regex:category,$options:'i'}}],
    
    
      })

      res.status(200).send({success:true,data:product})

  
  } catch (error) {
    next(error)
  }

}

module.exports={addProduct,uploadImage,allProducts,productById,editProduct,deleteProduct,AllProducts}