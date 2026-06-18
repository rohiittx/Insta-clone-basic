const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



async function registerController (req,res){
    const { username ,email, password, bio, profileImage} = req.body

    // const isUserExistByEmail = await userModel.findOne({ email })

    // if(isUserExistByEmail){
    //     return res.status(409).json({
    //         message: 'user already existb with this email'
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({ username })

    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         Message: 'user exit with this username'
    //     })
    // }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[  // $or operatior se ham find kr rhe dono ko ek sath email or username vo exist krte h kin nhi
            { username },
            { email }
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message: 'User already exist' + (isUserAlreadyExist.email === 
                email ? 'Email already exist' : 'Username already exist')
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    /**
     * -- user ka data hona chaiye 
     * -- data unique hona chahiye
     */
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,
     { expiresIn: '1d' })

    res.cookie('token', token)
    
    res.status(201).json({  
        message: 'user register successfully',
        user:{   // hame response m kabhi bhi password nhi bhejte h
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function loginController(req,res){
    const { username , email, password } = req.body

    /**
     * username
     * password
    */
   
    /**
     * email
     * password
     */

    const user = await userModel.findOne({
        $or:[ 
            {
                /**
                 * consdition
                 */
                username: username
            },
            {
                /**
                 * condition
                 */
                email: email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message: 'user not found'
        })
    }

    const hash = bcrypt.hash(password ,10)
    
    const ispasswordValid = await bcrypt.compare(password, user.password)

    if(!ispasswordValid){
        return res.status(401).json({
            message: 'password invalid'
        })
    }

    const token = jwt.sign(
        { id: user._id}
        ,process.env.JWT_SECRET,
        { expiresIn: '1d'}
    )

    res.cookie('token', token)

    res.status(200).json({
        message: 'User logedIn successfully',
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

module.exports = {
    registerController,
    loginController
}