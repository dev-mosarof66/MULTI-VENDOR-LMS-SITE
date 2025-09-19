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
app.use(express.static('/public'))
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.get('/test', (req, res) => {
    console.log('Hi from server')
})

