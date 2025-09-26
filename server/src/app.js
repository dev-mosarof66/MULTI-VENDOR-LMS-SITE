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
    origin: process.env.ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

console.log(process.env.ORIGIN.split(','))


//import route
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'

//use rotues
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('API is running....')
})