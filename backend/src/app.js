import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()
app.use(express.static('public'))

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

// app.get('/', (req,res)=>{
//     res.send("Hello world")
// })





export default app