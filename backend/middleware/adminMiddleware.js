const User=require('../mrc/user/user.model')

const admin=async(req,res,next)=>{

const  adminUser=await User.findOne({isAdmin:true})

    if(adminUser.isAdmin.toString()==='true'){
        next()
    }else{
        const error=new Error('Not authenticated as admin')
        error.statusCode=401
        throw error
    }

}

module.exports={admin}