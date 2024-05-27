import { Types } from "mongoose"

export const idValidate=(value,helper)=>{
    return Types.ObjectId.isValid(value)?true:helper.message("invlid id ya maan")
}


export const validation =(schema)=>{
    return (req,res,next)=>{
        const methods= {...req.body,...req.params,...req.query,...req.file}
        const result = schema.validate(methods,{abortEarly:true})


        if(result.error){
            req.validationError=result.error.details;
            return next(new Error("validation error", { cause: 403 }))
        }

        return next()


    }
} 