import { Schema, Types, model } from "mongoose";

const ApplicationSchema = new Schema({
    jobId: {
        type: Types.ObjectId,
        ref: 'Job',
        required: [true, 'jobId is required'],
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'userId is required'],
    },
    userTechSkills: {
        type: [String],
        required: [true, 'userTechSkills is required']
    },
    userSoftSkills: {
        type: [String],
        required: [true, 'userSoftSkills is required']
    },
    userResume: {
        type: Object,
        required: [true, 'userResume is required'],
    }
}, { timestamps: true })

export const ApplicationModel = model('Application', ApplicationSchema)
