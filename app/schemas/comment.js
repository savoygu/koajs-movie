const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema({
  movie: { type: ObjectId, ref: 'Movie' },
  from: { type: ObjectId, ref: 'User' },
  reply: [{
    from: { type: ObjectId, ref: 'User' },
    to: { type: ObjectId, ref: 'User' },
    content: String
  }],
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

CommentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

CommentSchema.statics = {
  fetch: function () {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec()
  },
  findById: function (id) {
    return this
      .findOne({ _id: id })
      .exec()
  }
}

module.exports = CommentSchema
