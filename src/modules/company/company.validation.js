import joi from "joi";
import { idValidate } from "../../middelware/validation.js";

export const addCompanySchema = joi.object({
    companyName: joi.string().min(2).max(20).required(),
    description: joi.string().min(10).max(200).required(),
    industry: joi.string().required(),
    address: joi.string().email().required(),
    numberOfEmployees: joi.number().min(11).max(20).required(),
    companyEmail: joi.string().email().required()
}).required()

export const UpdateCompanySchema = joi.object({
    companyId: joi.custom(idValidate).required(),
    companyName: joi.string().min(2).max(20).required(),
    description: joi.string().min(10).max(200).required(),
    industry: joi.string().required(),
    address: joi.string().email().required(),
    numberOfEmployees: joi.number().min(11).max(20).required(),
    companyEmail: joi.string().email().required()
}).required()

export const deleteCompanySchema = joi.object({
    companyId: joi.custom(idValidate).required(),
}).required()

export const getCompanyByIdSchema = joi.object({
    companyId: joi.custom(idValidate).required(),
}).required()

export const getCompanyByNameSchema = joi.object({
    companyName: joi.string().required(),
}).required()

export const getApplicationsSchema = joi.object({
    companyId: joi.custom(idValidate).required(),
}).required()
