import { ApplicationModel } from "../../../../DB/models/application.model.js";
import { CompanyModel } from "../../../../DB/models/company.model.js";
import { JobModel } from "../../../../DB/models/jop.model.js";
import clouadinary from "../../../utils/clouadinary.js";

export const addJob = async (req, res, next) => {
    const { addedBy } = req.body;
    const company = await CompanyModel.findOne({ _id: addedBy })
    if (!company) {
        return next(new Error('company is not found'))

    }
    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('you are not allowed to add jop to this copmany'))
    }
    const job = await JobModel.create(req.body)
    res.status(201).json({ message: "done", job })
}

export const updateJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobModel.findOne({ _id: jobId })
    if (!job) {
        return next(new Error('job is not found'))
    }
    const company = await CompanyModel.findOne({ _id: job.addedBy })
    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('you are not allowed to update job to this copmany'))
    }
    const updatedJob = await JobModel.findOneAndUpdate({ _id: jobId }, req.body, { new: true })
    res.status(201).json({ message: "done", updatedJob })
}

export const deleteJob = async (req, res, next) => {
    const { jobId } = req.params;
    const job = await JobModel.findOne({ _id: jobId })
    if (!job) {
        return next(new Error('job is not found'))
    }
    const company = await CompanyModel.findOne({ _id: job.addedBy })
    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('you are not allowed to update job to this copmany'))
    }
    await JobModel.deleteOne({ _id: jobId })
    await ApplicationModel.deleteMany({ jobId })

    res.status(200).json({ message: "done" })
}

export const getJobs = async (req, res, next) => {
    const jobs = await JobModel.find({}).populate('addedBy')
    res.status(200).json({ message: "done", jobs })
}

export const getJobsForCompany = async (req, res, next) => {
    const { companyName } = req.query;
    const company = await CompanyModel.findOne({ companyName })
    if (!company) {
        return next(new Error('copmany is not found'))

    }
    const jobs = await JobModel.find({ addedBy: company._id })
    res.status(200).json({ message: "done", jobs })
}

export const  JobsThatMatch = async (req, res, next) => {
    const filter = req.query;
    const jops = await JobModel.find(filter)
    res.status(200).json({ message: "done", jops })
}

export const applyJob = async (req, res, next) => {
    const { jobId } = req.body;
    if (!await JobModel.findOne({ _id: jobId })) {
        return next(new Error('job is not found'))
    }
    let { secure_url, public_id } = await clouadinary.uploader.upload(req.file.path, { folder: "Resume" })
    req.body.userResume = { secure_url, public_id }
    req.body.userId=req.user._id
    const application = await ApplicationModel.create(req.body)
    res.status(200).json({ message: "done", application })
}






