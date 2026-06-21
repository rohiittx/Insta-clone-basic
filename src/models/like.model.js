const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Post model
        ref: 'Post',
        required: [true, 'Post id is required for creating a like']
    },
    user: {
        type: String,
        ref: 'User',
        required: [true, 'Username is required for creating a like']
    }
}, {
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true }); // Ensure a user can like a post only once

const LikeModel = mongoose.model('Like', likeSchema);

module.exports = LikeModel;