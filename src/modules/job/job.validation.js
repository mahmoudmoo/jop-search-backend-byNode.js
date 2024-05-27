import joi from "joi";
import { idValidate } from "../../middelware/validation.js";

export const addJobSchema = joi.object({
    jobTitle: joi.string().min(2).max(30).required(),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: joi.string().min(10).max(300).required(),
    technicalSkills: joi.array().items(joi.string()).required(),
    softSkills: joi.array().items(joi.string()).required(),
    addedBy: joi.custom(idValidate).required(),
}).required()

export const updateJobSchema = joi.object({
    jobTitle: joi.string().min(2).max(30).required(),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid').required(),
    workingTime: joi.string().valid('part-time', 'full-time').required(),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: joi.string().min(10).max(300).required(),
    technicalSkills: joi.array().items(joi.string()).required(),
    softSkills: joi.array().items(joi.string()).required(),
    jobId:joi.custom(idValidate).required(),
}).required()

export const deleteJobSchema = joi.object({
    jobId:joi.custom(idValidate).required()
}).required()

export const getJobsForCompanySchema = joi.object({
    companyName:joi.string().min(2).max(30).required(),
}).required()

export const JobsThatMatchSchema = joi.object({
    jobTitle: joi.string().min(2).max(30),
    jobLocation: joi.string().valid('onsite', 'remotely', 'hybrid'),
    workingTime: joi.string().valid('part-time', 'full-time'),
    seniorityLevel: joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    technicalSkills: joi.array().items(joi.string()).required(),   
}).required()


export const applyJob = joi.object({
    jobId:joi.custom(idValidate).required(),
    softSkills: joi.array().items(joi.string()).required(),
    userSoftSkills: joi.array().items(joi.string()).required(),
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().required()
}).required()

