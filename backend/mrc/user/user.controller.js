const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkValidationError } = require("../../utils/utils");
const { check } = require("express-validator");

const register = async (req, res, next) => {
  try {
    checkValidationError(req);
    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("User already exist");
      error.statusCode = 400;
      throw error;
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await new User({
        fullName,
        email,
        password: hashedPassword,
      });

      newUser.save();

      res
        .status(200)
        .send({
          success: true,
          msg: "User created successfully",
          _id:newUser._id,
          fullName:newUser.fullName,
          email:newUser.email,
          isAdmin:newUser.isAdmin,
          token: generateToken(newUser._id),
        });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    checkValidationError(req);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Email or Password is incorrect");
      error.statusCode = 400;
      throw error;
    } else {
      const isEqual =await bcrypt.compare(password, user.password);

      if (!isEqual) {
        const error = new Error("Email or Password is incorrect");
        error.statusCode = 400;
        throw error;
      } else {
        res
          .status(200)
          .send({
            success: true,
            msg: "Successful,redirecting...",
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            isAdmin:user.isAdmin,
            token: generateToken(user._id),
          });
      }
    }
  } catch (error) {
    next(error);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "30d" });
};

//user authorization ends


const getUser=async(req,res,next)=>{

  try {
    checkValidationError(req)

    const user=await User.findById(req.params.userId).select('-password')

    res.status(200).send({msg:'User data fetched',success:true,data:user })
  } catch (error) {
    next(error)
  }

}

const updateProfile=async(req,res,next)=>{

    const {fullName,email}=req.body
  try {
    checkValidationError(req)

    if(!fullName || !email){
      const error=new Error('Please include all fields')
      error.statusCode=400
      throw error
      
    }else{
      const user=await User.findByIdAndUpdate(req.params.userId,{fullName,email})

      await user.save()

      res.status(200).send({success:true,msg:'User updated successfully'})
    }
  } catch (error) {
    next(error)
  }

}

const getAllUsers=async(req,res,next)=>{

  try {
    checkValidationError(req)

    
    const admin=await User.findOne({_id:req.userId})

    if(admin.isAdmin.toString()==='true'){
      const users=await User.find({})

    res.status(200).send({success:true,data:users})
    }else{
      const error=new Error('Not authenticated as admin ')
      error.statusCode=401
      throw error

    }

    
  } catch (error) {
    next(error)
  }
}

const deleteUser=async(req,res,next)=>{
  const user=await User.findOne({_id:req.userId})
  try {
    checkValidationError(req)

    if(user.isAdmin.toString()==='true'){

      const deleteUser=await User.findById(req.params.userId)

      deleteUser.remove()


      res.status(200).send({success:true,msg:'User blocked successfully'})
    }else{
      const error=new Error('Not authenticated as admin ')
      error.statusCode=401
      throw error
    }
    
  } catch (error) {
    
    next(error)
  }

}

module.exports = { register, login,getUser,updateProfile,getAllUsers,deleteUser };
