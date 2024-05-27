export const catchErorr = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            return next(new Error(err, { cause: 500 }))
        })
    }
}

export const globalErorr = (error, req, res, next) => {
    req.validationError ? res.status(error.cause || 400).json({ message: error.message, validationError:req.validationError }) : res.status(error.cause || 400).json({ message: error.message, stack: error.stack })


}

