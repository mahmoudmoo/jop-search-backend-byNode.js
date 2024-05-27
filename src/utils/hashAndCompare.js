import bcrypt from 'bcrypt'
export const hashPass=({password,salt=process.env.SALAT_ROUND}={})=>{
    return bcrypt.hashSync(password,parseInt(salt))
     
}

export const comparePass=({password,hashPassword}={})=>{
    return bcrypt.compareSync(password,hashPassword)     
}




