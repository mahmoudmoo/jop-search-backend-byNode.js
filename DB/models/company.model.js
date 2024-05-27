import { Schema, Types, model } from "mongoose";

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: [true, 'companyName is required'],
        unique: [true, 'companyName must be unique value'],
        min: [2, 'min length is 2 char'],
        max: [20, 'max length is 20 char']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    industry: {
        type: String,
        required: [true, 'industry is required'],
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    numberOfEmployees: {
        type: Number,
        required: [true, 'numberOfEmployees is required'],
        min: [11, 'min employee is 11 char'],
        max: [20, 'max employee is 20 char']
    },
    companyEmail: {
        type: String,
        required: [true, 'companyEmail is required'],
        unique: [true, 'companyEmail must be unique value']

    },
    companyHR: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'companyEmail is required'],
    }
}, { timestamps: true })

export const CompanyModel = model('Company', CompanySchema)
