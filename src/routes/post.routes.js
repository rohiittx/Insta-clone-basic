const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

/**
 * POST /api/posts
 * -- req.body = { caption, image-file }
 * /api/posts/ --routing api
 */

postRouter.post('/',upload.single('image'),postController.createPostController)

module.exports = postRouter   