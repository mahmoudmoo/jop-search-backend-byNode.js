import { config } from 'dotenv'
import express from 'express'
import path from 'path'
import { bootstrap } from './src/bootstrap.js'
config({path:path.resolve('config/.env')})
const app = express()
const port = process.env.PORT
bootstrap(app,express)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))