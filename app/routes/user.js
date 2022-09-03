const router = require('koa-router')()
const Permission = require('../middleware/permission')
const User = require('../controllers/user')
const Comment = require('../controllers/comment')

// 用户
router.post('/signup', User.signup) // 用户注册
router.post('/signin', User.signin) // 用户登录

// 评论
router.post('/comment', Permission.signinRequired, Comment.save) // 新增评论

module.exports = router.routes()
