const {validationResult}=require('express-validator')

const checkValidationError=(req)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        let message=errors.array()[0].param + ' '+errors.array()[0].msg
        throw new Error(message)
    }


}

module.exports={checkValidationError}