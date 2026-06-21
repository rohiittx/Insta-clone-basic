const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middleware/auth.middleware')

const userRouter = express.Router()

/**
 * @route Post  /api/users/follow/:username
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:username', identifyUser, userController.followUserController)


/**
 * @route Post  /api/users/unfollow/:username
 * @description Unfollow a user
 * @access Private
 */
userRouter.post('/unfollow/:username', identifyUser, userController.unfollowUserController)



module.exports = userRouter