const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoute = require('./routes/User')
const examQuestionsRoute = require('./routes/ExamQuestions')
const userExamsRoute = require('./routes/UserExams')
const examRoute = require('./routes/Exam')
require('dotenv').config()

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(data => {
    console.log("connected to DB")
}).catch(error => {
    console.log(error)
})

app.use('/users', userRoute)
app.use('/examquestions', examQuestionsRoute)
app.use('/exam', examRoute)
app.use('/userexams', userExamsRoute)

app.listen(5000, () => {
    console.log('Server started on 5000')
})



