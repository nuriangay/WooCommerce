const jwt=require('jsonwebtoken')
const User=require('../mrc/user/user.model')

const protect=async(req,res,next)=>{
    try {
        const authHeader=req.get('Authorization')

        if(!authHeader){
            const error=new Error('Not authenticated')
            error.statusCode=401
            throw error
        }

        const token=authHeader.split(' ')[1]


        const decoded=jwt.verify(token,process.env.SECRET)
        if(!decoded){
            const error=new Error('Not authenticated')
            error.statusCode=401
            throw error

        }
        req.userId=decoded.id
        next()
        
       
        
    } catch (error) {
        next(error)
        
    }
}




module.exports={protect}