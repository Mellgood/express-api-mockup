const router = require('express').Router()
const User = require('../model/User')
const  loginValidation = require('../validators/loginValidator')
const  registerValidation = require('../validators/registerValidator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//register new user
router.post('/register', async (req, res) => {

    // Do validation stuffs...
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if the user is on DB yet (by email)
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)


    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    // Try to save the user
    try {
        const savedUser = await user.save()
        res.send({
            user: user._id
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)

    }
})

// login
router.post('/login', async (req, res) => {

    // Do validation stuffs...
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    //Check if the email exist
    const thisUser = await User.findOne({ email: req.body.email })
    if (!thisUser) return res.status(400).send('Email or password is wrong!')
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, thisUser.password)
    if(!validPass) return res.status(400).send('Email or password is wrong!')

    // Create and assign a token
    const token = jwt.sign({
        _id: thisUser._id
    },process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})


module.exports = router