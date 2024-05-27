import { Router } from "express";
import * as companyControllers from "./controller/company.controller.js"
import { auth } from "../../middelware/auth.js";
import { endpoints } from "./company.endpoints.js";
import { catchErorr } from "../../utils/handelError.js";
import { validation } from "../../middelware/validation.js";
import * as companySchemas from "./company.validation.js"
export const companyRouter = Router()

companyRouter.post('/', catchErorr(auth(endpoints.addCompany)),validation(companySchemas.addCompanySchema), catchErorr(companyControllers.addCompany))
companyRouter.patch('/:companyId', catchErorr(auth(endpoints.updateCompany)),validation(companySchemas.UpdateCompanySchema), catchErorr(companyControllers.updateCompany))
companyRouter.delete('/:companyId', catchErorr(auth(endpoints.deleteCompany)),validation(companySchemas.deleteCompanySchema), catchErorr(companyControllers.deleteCompany))
companyRouter.get('/getCompanyById/:companyId', catchErorr(auth(endpoints.getCompanyById)),validation(companySchemas.getCompanyByIdSchema), catchErorr(companyControllers.getCompanyById))
companyRouter.get('/getCompanyByName', catchErorr(auth(endpoints.getCompanyByName)),validation(companySchemas.getCompanyByNameSchema), catchErorr(companyControllers.getCompanyByName))
companyRouter.post('/getApplications', catchErorr(auth(endpoints.getApplications)),validation(companySchemas.getApplicationsSchema), catchErorr(companyControllers.getApplications))

