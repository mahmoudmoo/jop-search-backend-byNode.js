import mongoose from "mongoose";

export const connection = async () => {
    return await mongoose.connect(process.env.DB_URI)
    .then(console.log('db connecting'))
    .catch((err) => console.log(err, 'error from db connection'))
}