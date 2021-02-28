const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')



//MIDDLEWARE
//add routes using middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postsRoute)
app.use('/auth', authRoute)

//routes
app.get('/', (req, res) => {
    res.send("Homepage")
})


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    () => { console.log("Connected to DB!") })


//listen on port
app.listen(3000)