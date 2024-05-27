import { Router } from "express";
import * as jobControllers from "./controller/job.controller.js"
import { auth } from "../../middelware/auth.js";
import { endpoints } from "./jop.endpoints.js";
import { catchErorr } from "../../utils/handelError.js";
import { fileValidation, uploadFile } from "../../utils/cloudinary.multer.js";
import { validation } from "../../middelware/validation.js";
import * as jobValidations from "./job.validation.js"
export const jobRouter = Router()

jobRouter.post('/', catchErorr(auth(endpoints.addJob)), validation(jobValidations.addJobSchema), catchErorr(jobControllers.addJob))
jobRouter.patch('/:jobId', catchErorr(auth(endpoints.updateJob)), validation(jobValidations.updateJobSchema), catchErorr(jobControllers.updateJob))
jobRouter.delete('/:jobId', catchErorr(auth(endpoints.deleteJob)), validation(jobValidations.deleteJobSchema), catchErorr(jobControllers.deleteJob))
jobRouter.get('/getJobs', catchErorr(auth(endpoints.getJobs)), catchErorr(jobControllers.getJobs))
jobRouter.get('/getJobsForCompany', catchErorr(auth(endpoints.getJobsForCompany)), validation(jobValidations.getJobsForCompanySchema), catchErorr(jobControllers.getJobsForCompany))
jobRouter.get('/JobsThatMatch', catchErorr(auth(endpoints.JobsThatMatch)),validation(jobValidations.JobsThatMatchSchema), catchErorr(jobControllers.JobsThatMatch))

jobRouter.post('/applyJob', catchErorr(auth(endpoints.applyJob)), uploadFile({ customValidation: fileValidation.pdf }).single('pdf'), validation(jobValidations.applyJob), catchErorr(jobControllers.applyJob))
