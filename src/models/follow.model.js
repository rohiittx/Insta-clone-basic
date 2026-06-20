const mongoose = require('mongoose')
const { applyTimestamps } = require('./post.model')

const followSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true , 'Follower is required']
    },

    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, 'Followee is required']
    }
},{
    timestamps: true  // ye document kab create hua tha ya update hua tha database me uska time record krta h or btata h
})

const followModel = mongoose.model('follows', followSchema)

module.exports = followModel