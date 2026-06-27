const postModel = require('../models/post.model')
const ImageKIt = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken') 
const LikeModel = require('../models/like.model')


const imagekit = new ImageKIt({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file); // caption or file hamara body se aa rha h
    
    const file =await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : 'test' ,
        folder: 'cohort-2-insta-clone-posts'
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    // res.send(file)
    res.status(201).json({
        message:'Post Created Successfully.',
        post
    })

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

async function getPostController(req,res){

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: 'Post fetched successfully',
        posts
    })

}

async function getPostDetailsController(req,res){

    const userId = req.user.id

    const postId = req.params.postId

    const post = await postModel.findById({ postId })

    if(!post){
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    const isValidUser = post.user.toString === userId

    if(!isValidUser){
        return res.status(403).json({
            message: ' Forbidden content'
        })
    }

    return res.status(200).json({
        message: 'post fetched successfully'
    })
}

async function likePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    // Check if the post exists
    const post = await postModel.findById({ postId }); 

    if (!post) {
        return res.status(404).json({
            message: 'Post not found'
        });
    }

    // Check if the user has already liked the post
    const existingLike = await LikeModel.findOne({ 
        post: postId, 
        user: userId 
    });

    if (existingLike) {
        // If the like already exists, remove it (unlike)
        await LikeModel.deleteOne({ _id: existingLike._id });
        return res.status(200).json({ message: 'Post unliked successfully' });
    } else {
        // If the like does not exist, create it (like)
        await LikeModel.create({ 
            post: postId, 
            username: username 
        });
        return res.status(200).json({ 
            message: 'Post liked successfully' 
        });
    }
}

async function getFeedController(req, res) {
    const posts = await Promise.all(await postModel.find().populate('user').lean()) //find method se hame user ki sirf id milti h but jab ham find.populate krte h to hame user ki sari details mil jati h
    .map(async (post)=>{                                                     // lean method mongoose object ko normal object me change kr deti h

        const isLiked = await LikeModel.findOne({
            user:user.username,
            post: post._id
        })

        post.isLiked = Boolean(isLiked)

        return post
    })

    res.Status(200).json({
        message: 'Feed fetched successfully',
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}