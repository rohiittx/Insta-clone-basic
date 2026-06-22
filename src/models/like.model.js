const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, // Iska matlab hai ki post field me MongoDB ka ObjectId store hoga, jo ki ek unique identifier hota hai har document ke liye.
        ref: 'Post',    // Ye Mongoose ko batata hai ki ye ObjectId Post model ko refer kar raha hai
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