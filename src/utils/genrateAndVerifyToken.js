import jwt from 'jsonwebtoken'


export const genrateToken=({payload,tokenKey=process.env.TOKEN_KEY,expiresIn=60*60}={})=>{
    return jwt.sign(payload,tokenKey,{expiresIn})
}
export const verifyToken=({token,tokenKey=process.env.TOKEN_KEY}={})=>{
    return jwt.verify(token,tokenKey)
}