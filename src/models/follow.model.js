const mongoose = require('mongoose')
const { applyTimestamps } = require('./post.model')

const followSchema = mongoose.Schema({
    follower: {
        type: String  //becoz hame username store kr rhe  h

        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users",
        // required: [true , 'Follower is required']
    },

    followee: {
        type: String

        // type: mongoose.Schema.Types.ObjectId,
        // ref: "users",
        // required: [true, 'Followee is required']
    },
    status: {
        type: String,
        default: 'pending',
        enum: {   // ye ensure krta h ki status sirf inhi 3 me se koi ek hi ho sakta h
            values: ['pending', 'accepted', 'rejected'],
            message: 'Status must be either pending, accepted, or rejected'
        }
    }
},{
    timestamps: true  // ye document kab create hua tha ya update hua tha database me uska time record krta h or btata h
})

followSchema.index({ followee:1 , follower:1 },{ unique:true })  // ek user dusre user ko sirf ek bar follow kr sakta h

const followModel = mongoose.model('follows', followSchema)

module.exports = followModel