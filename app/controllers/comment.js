const _ = require('underscore')
const Comment = require('../models/comment')

// 新增电影 / 更新电影
exports.save = async function (ctx) {
  const _comment = ctx.request.body.comment
  const movieId = _comment.movie
  let comment

  try {
    if (_comment.cid) {
      comment = await Comment.findById(_comment.cid)
      const reply = {
        from: _comment.from,
        to: _comment.tid,
        content: _comment.content
      }

      comment.reply.push(reply)

      await comment.save()
      ctx.redirect('/movie/' + movieId)
    } else {
      comment = new Comment(_comment)

      await comment.save()
      ctx.redirect('/movie/' + movieId)
    }
  } catch (e) {
    console.log(e)
  }
}
