const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req,res){  
    
    const followerUsername = req.user.username // ye hamne middleware se set kiya h ki konsa user request kr rha h to uska username hamne yha pr set kr diya h
    const followeeUsername = req.params.username  // ye hamne url se username ko params se find kiya h jis user ko follow krna h uska username hamne yha pr set kr diya h

    const isFolloweeExist = await userModel.findOne({  //check kr rhe h jis user ko follow kr rhe h vo exist krta h ki nhi
        username: followeeUsername
    })

    if(!isFolloweeExist){  // same user khud ko follow nhi kr sakta uske liye check lgaya h
        return res.status(404).json({
            message: 'user does not exist'
        })
    }

    if(followeeUsername == followerUsername){  // agar user khud ko follow krne ki kosis krta h to usko response send kr diya
        return res.status(401).json({
            message: 'you will not follow yourself'
        })
    }

    const isAlreadyFollowing = await followModel.findOne({  // check lgaya h kahi hamara follower pehle se hi to folllow nhi krta h
        followeeUsername: followeeUsername, // ye check kr rhe h ki kya user follow krta h jis user ko follow kr rhe h
        followerUsername: followerUsername  
    })

     if(isAlreadyFollowing){  // user ko response send kr diya
           return res.status(409).json({
            message: 'you already follow this user'
        }) 
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        follow : followRecord
    })

}

async function unfollowUserController(req,res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername, // check kr rhe h ki kya user follow krta h jis user ko unfollow kr rhe h
        followee: followeeUsername
    })

    if(!isUserFollowing){  // agar user follow nhi krta h to usko response send kr diya
        return res.status(200).json({
            message: `you are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id) // agar user unfollow krta h to uska record delete kr diya

    res.status(200).json({
        message: `you have unfollowed ${followeeUsername}`
    })
}

module.exports = { followUserController, unfollowUserController }