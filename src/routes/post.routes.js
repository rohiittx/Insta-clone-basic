const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require('../middleware/auth.middleware')  // middleware

/**
 * POST /api/posts
 * -- req.body = { caption, image-file }
 * /api/posts/ --routing api
 */

postRouter.post('/',upload.single('image'), identifyUser ,postController.createPostController)

postRouter.get('/', postController.getPostController)

/**
 * GET /api/posts/details/:postid
 * -- return an detail about specefic post with the id. also check wether the post 
 * belongs to the user that request come from
 */

postRouter.get('/details/:postId', identifyUser , postController.getPostDetailsController)

/**
 * @route Post /api/posts/like/:postId
 * @desc Like a post. If the user has already liked the post, it will unlike it.
 * @access Private (requires authentication)
 */
postRouter.post('/like/:postId', identifyUser, postController.likePostController)   

module.exports = postRouter   