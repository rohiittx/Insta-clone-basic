const express  = require('express')
const authController = require('../controllers/auth.controller')
const identifyUser = require('../middleware/auth.middleware')  // middleware

const authRouter = express.Router()

/***
 * @route POST /api/auth/register
 * @desc Register a new user and return a JWT token in cookie
 * @access Public
 * /api/auth/register --routing api
 */
authRouter.post('/register', authController.registerController)

/**
 * @route POST /api/auth/login
 * @desc Login a user and return a JWT token in cookie
 * @access Public
 * /api/auth/login --routing api
 */
authRouter.post('/login', authController.loginController)

/**
 * @route POST /api/auth/get-me
 * @desc Get the currently logged-in user's information
 * @access Private
 * /api/auth/get-me --routing api
 */
authRouter.get('/get-me', identifyUser, authController.getMeController)

module.exports = authRouter
