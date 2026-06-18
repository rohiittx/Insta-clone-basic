const postModel = require('../models/post.model')
const ImageKIt = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')


const imagekit = new ImageKIt({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file); // caption or file hamara body se aa rha h
    
    const token = req.cookies.token // ye hamne find kiya ki konsa user post create kr rha h or request kr rha h post create krne ki
    // jab user post create krega to vo apne token k sath request krega usi token se ham find krenge konsa user h

    if(!token){
        return res.send(401).json({
            message: 'TOken not exist, Unauthorized access'
        })
    }

    let decoded = null

    try{   // agar user sahi token se authorize kr rha h to try method run hoga
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){   // agar token glt h to catch method error send kr dega glt token ka
        return res.status(401).json({
            message: 'user not anthorized'
        })
    }

    console.log(decoded);
    
    const file =await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : 'test' ,
        folder: 'cohort-2-insta-clone-posts'
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    // res.send(file)
    res.status(201).json({
        message:'Post Created Successfully.',
        post
    })

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        


module.exports = {
    createPostController
}