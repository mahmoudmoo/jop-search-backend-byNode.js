import { Router } from "express"
import * as authControllers from './controllers/auth.controller.js'
import { catchErorr } from "../../utils/handelError.js"
import { auth } from "../../middelware/auth.js"
import { validation } from "../../middelware/validation.js"
import * as validationSchemas from "./auth.validtion.js"
export const authRouter = Router()

authRouter.post('/signUp', validation(validationSchemas.SignUpSchema), catchErorr(authControllers.signUp))

authRouter.get('/confirmEmail/:token', catchErorr(authControllers.confirmEmail))

authRouter.post('/logIn', validation(validationSchemas.LoginSchema), catchErorr(authControllers.login))

authRouter.put('/updateAccount', catchErorr(auth()), validation(validationSchemas.updateAccountSchema), catchErorr(authControllers.updateAccount))

authRouter.patch('/deleteAccount', catchErorr(auth()), catchErorr(authControllers.deleteAccount))

authRouter.get('/getAccountdata', catchErorr(auth()), catchErorr(authControllers.getAccountdata))

authRouter.get('/getAnotherAccountdata/:_id', catchErorr(auth()), validation(validationSchemas.getAnotherAccountdataSchema), catchErorr(authControllers.getAnotherAccountdata))

authRouter.patch('/updatePass', catchErorr(auth()), validation(validationSchemas.updatePassSchema), catchErorr(authControllers.updatePass))

authRouter.patch('/sendCodeForForgetPass', validation(validationSchemas.sendCodeForForgetPassSchema), catchErorr(authControllers.sendCodeForForgetPass))

authRouter.patch('/ForgetPass', validation(validationSchemas.ForgetPassSchema), catchErorr(authControllers.ForgetPass))

authRouter.get('/getAccountsforRecoveryMail', validation(validationSchemas.getAccountsforRecoveryMailSchema), catchErorr(authControllers.getAccountsforRecoveryMail))
