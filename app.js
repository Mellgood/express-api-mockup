const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postsRoute = require('./routes/posts')
const cors = require('cors')
require('dotenv/config')



//MIDDLEWARE
//add routes using middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/posts', postsRoute)

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