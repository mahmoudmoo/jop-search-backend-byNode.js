import { connection } from "../DB/connection.js";
import { authRouter } from "./modules/auth/auth.router.js";
import { companyRouter } from "./modules/company/company.router.js";
import { jobRouter } from "./modules/job/job.router.js";
import { globalErorr } from "./utils/handelError.js";

export const bootstrap = (app, express) => {

    connection()

    app.use(express.json())


    app.use('/auth', authRouter)
    app.use('/company', companyRouter)
    app.use('/job', jobRouter)

    app.use(globalErorr)
    console.log('hi from bootstrap');
}