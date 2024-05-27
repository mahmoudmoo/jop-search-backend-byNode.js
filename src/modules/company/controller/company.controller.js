import { ApplicationModel } from "../../../../DB/models/application.model.js";
import { CompanyModel } from "../../../../DB/models/company.model.js";
import { JobModel } from "../../../../DB/models/jop.model.js";

export const addCompany = async (req, res, next) => {
    const { companyName, companyEmail } = req.body;
    if (await CompanyModel.findOne({ companyName })) {
        return next(new Error('companyName must be uniqe value'))
    }
    if (await CompanyModel.findOne({ companyEmail })) {
        return next(new Error('companyEmail must be uniqe value'))
    }
    req.body.companyHR = req.user._id
    const company = await CompanyModel.create(req.body)
    res.status(201).json({ message: "done", company })
}

export const updateCompany = async (req, res, next) => {
    const { companyId } = req.params
    const company = await CompanyModel.findOne({ _id: companyId })
    if (!company) {
        return next(new Error('company not found'))
    }

    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('companyHR only can update data'))
    }
    const { companyName, companyEmail } = req.body;
    if (await CompanyModel.findOne({ companyName })) {
        return next(new Error('companyName must be uniqe value'))
    }
    if (await CompanyModel.findOne({ companyEmail })) {
        return next(new Error('companyEmail must be uniqe value'))
    }
    const updatedCompany = await CompanyModel.findOneAndUpdate({ _id: companyId }, req.body, { new: true })
    res.status(200).json({ message: "done", updatedCompany })
}

export const deleteCompany = async (req, res, next) => {
    const { companyId } = req.params
    const company = await CompanyModel.findOne({ _id: companyId })
    if (!company) {
        return next(new Error('company not found'))
    }
    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('companyHR only can delete company'))
    }
    await CompanyModel.deleteOne({ _id: companyId })
    const jobs = await JobModel.find({ addedBy: companyId })
    for (const jop of jobs) {
        await ApplicationModel.deleteMany({ jobId: jop._id })
    }
    await JobModel.deleteMany({ addedBy: companyId })
    res.status(200).json({ message: "done" })
}

export const getCompanyById = async (req, res, next) => {
    const { companyId } = req.params
    const company = await CompanyModel.findOne({ _id: companyId })
    if (!company) {
        return next(new Error('company not found'))
    }
    if (company.companyHR.toString() != req.user._id.toString()) {
        return next(new Error('companyHR only can be accsses company data'))
    }
    const jobs = await JobModel.find({ addedBy: company._id })
    res.status(200).json({ message: "done", company, jobs })
}

export const getCompanyByName = async (req, res, next) => {
    const { companyName } = req.params
    const company = await CompanyModel.findOne({ companyName })
    if (!company) {
        return next(new Error('company not found'))
    }
    res.status(200).json({ message: "done", company })
}

export const getApplications = async (req, res, next) => {
    const { companyId } = req.params
    const company = await CompanyModel.find({ _id: companyId })
    if (company.companyHR != req.user._id) {
        return next(new Error('companyHR only can delete company'))
    }
    const jobs = await JobModel.find({ addedBy: company.companyHR })
    const Companyapplications = []
    for (const jop of jobs) {
        const applications = await ApplicationModel.find({ jobId: jop._id }).populate('userId')
        Companyapplications.push(applications)
    }


    res.status(200).json({ message: "done", Companyapplications })
}