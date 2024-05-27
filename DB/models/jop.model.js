import { Schema, Types, model } from "mongoose";

const JobSchema = new Schema({
    jobTitle: {
        type: String,
        required: [true, 'jobTitle is required'],
    },
    jobLocation: {
        type: String,
        required: [true, 'jobLocation is required'],
        enum: ['onsite', 'remotely', 'hybrid']

    },
    workingTime: {
        type: String,
        required: [true, 'workingTime is required'],
        enum: ['part-time', 'full-time']

    },
    seniorityLevel: {
        type: String,
        required: [true, 'seniorityLevel is required'],
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO']

    },
    jobDescription: {
        type: String,
        required: [true, 'jobDescription is required']
    },
    technicalSkills: {
        type: [String],
        required: [true, 'technicalSkills is required']
    },
    softSkills: {
        type: [String],
        required: [true, 'softSkills is required']
    },
    addedBy: {
        type: Types.ObjectId,
        ref: 'Company',
        required: [true, 'addedBy is required'],
    }
}, { timestamps: true })

export const JobModel = model('Job', JobSchema)
