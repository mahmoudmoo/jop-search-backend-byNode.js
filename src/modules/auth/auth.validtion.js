import joi from "joi";
import { idValidate } from "../../middelware/validation.js";

export const SignUpSchema = joi.object({
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    recoveryEmail: joi.string().email().required(),
    password: joi.string().required(),
    mobileNumber: joi.string().min(10).max(12).required(),
    gender: joi.string().valid("male","female").required(),
    DOB: joi.date().required()
}).required()

export const LoginSchema = joi.object({
    fild: joi.string().required(),
    password: joi.string().required()
}).required()

export const updateAccountSchema = joi.object({
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    recoveryEmail: joi.string().email().required(),
    mobileNumber: joi.string().min(10).max(12).required(),
    gender: joi.string().valid("male","female").required(),
    DOB: joi.date().required()
}).required()


export const getAnotherAccountdataSchema = joi.object({
    _id: joi.custom(idValidate).required(),
}).required()

export const updatePassSchema = joi.object({
    oldPass: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")).required(),
    newPass: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")).required()
}).required()


export const sendCodeForForgetPassSchema = joi.object({
    email: joi.string().email().required(),
}).required()

export const ForgetPassSchema = joi.object({
    email: joi.string().email().required(),
    code: joi.string().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")).required()
}).required()

export const getAccountsforRecoveryMailSchema = joi.object({
    recoveryEmail: joi.string().email().required(),
}).required()




