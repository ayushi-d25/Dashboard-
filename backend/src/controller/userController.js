const express = require('express')
const {  login, getUserProfile, register, logout } = require("../service/userService")
const { authenticate } = require("../middleware/authentication")

const userRouter = express.Router()

userRouter.post('/register',
    register
)

userRouter.post('/login',
    login
)

userRouter.get('/profile',
    authenticate,
    getUserProfile
)

userRouter.post('/logout',
    authenticate,
    logout  
)

module.exports = { userRouter }
