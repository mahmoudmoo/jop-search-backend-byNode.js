import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'userName is required'],
        trim: true,
        min: [2, 'min length is 2 char'],
        max: [20, 'max length is 20 char']
    },  
    lastName: {
        type: String,
        required: [true, 'userName is required'],
        trim: true,
        min: [2, 'min length is 2 char'],
        max: [20, 'max length is 20 char']
    },
    userName: {
        type: String,
        required: [true, 'userName is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique value']
    },
    recoveryEmail: {
        type: String,
        required: [true, 'recoveryEmail is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    mobileNumber: {
        type: String,
        required: [true, 'mobileNumber is required'],
        unique: [true, 'mobileNumber must be unique value']
    },
    role: {
        type: String,
        default: 'User',
        enum: ['Company_HR', 'User']
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        enum: ['male', 'female']
    },
    DOB: {
        type: Date,
        required: [false, 'date of birth is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    code: {
        type: String,
        default: null
    }
}, { timestamps: true })

export const userModel = model('User', UserSchema)
