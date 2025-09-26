import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())
app.use(express.json({
    limit: "50mb"
}))
app.use(express.urlencoded({
    limit: "50mb"
}))
app.use(express.static('public'))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))


//import route
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'

//use rotues
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)