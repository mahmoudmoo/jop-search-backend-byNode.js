import jwt from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";
import { Types } from "mongoose";

export const auth = (endPoint=['User',"Company_HR"]) => {
    return async (req, res, next) => {
        const { token } = req.headers
        if (!token) {
            return next(new Error("please login", { cause: 401 }))
        }
        if (!token.startsWith(process.env.TOKEN_START)) {
            return next(new Error("invalid token", { cause: 401 }))
        }
        const realToken = token.split(process.env.TOKEN_START)[1]

        const payload = jwt.verify(realToken, process.env.TOKEN_KEY)

        const { _id } = payload;

        if (!_id) {
            return next(new Error("invalid paylod", { cause: 401 }))
        }


        const user = await userModel.findOne({ _id}).select('-password')
        if (!user) {
            return next(new Error("user not found", { cause: 404 }))
        }
        if (user.isDeleted) {
            return next(new Error("user is deleted", { cause: 404 }))
        }
        if (user.status == 'offline') {
            return next(new Error("please logIN again", { cause: 404 }))
        }
        
        
        endPoint?.includes(user.role) ? null : next(new Error("unothrized", { cause: 401 }))

        req.user = user
        next()
    }
}