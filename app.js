const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const authMiddleware = require("./middlewares/authMiddleware");

const authRouter = require('./router/authRouter')
const childRouter = require('./router/childRouter')
const teacherRouter = require('./router/teacherRouter')
const classRouter = require('./router/classRouter')


require("dotenv").config();
require("./config/database").connect();



const app = express()
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))


app.use(authRouter)
app.use(authMiddleware)
app.use('/child',childRouter)
app.use('/teacher',teacherRouter)
app.use('/class',classRouter)


app.use((req, res,next) => {
    res.status(404).send('Page Not Found!')
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({message:err+""})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})