const mongoose = require('mongoose')
const CommentSchema = require('../schemas/comment');
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
