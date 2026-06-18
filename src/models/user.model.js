const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'user name already exist'],
        required: [true , 'user name is required']
    },

    email: {
        type: String,
        unique: [true, 'this email is already exist'],
        required: [true ,' email id is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required' ]
    },

    bio: String,

    profileImage: {
        type: String,
        default:'https://ik.imagekit.io/lr2cwsem8/default-avatar-profile-icon-social-media-user-vector-49816613.avif'
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel