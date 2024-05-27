import multer from "multer"

export const fileValidation={
    image:['image/png','image/jpeg'],
    pdf:['application/pdf']
}

export const uploadFile=({customValidation}={})=>{
    const storage = multer.diskStorage({})
    const fileFilter =(req,file,cb)=>{
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error('invalid type'),false)
        }
    }


    const upload=multer({fileFilter,storage})
    return upload
}

