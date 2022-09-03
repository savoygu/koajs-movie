const router = require('koa-router')()

const Index = require('../controllers/index')
const User = require('../controllers/user')

// 首页
router.get('/', Index.index) // 电影首页

// 用户
router.get('signin', User.showSignin) // 登录页面
router.get('signup', User.showSignup) // 注册页面
router.get('logout', User.logout) // 登出

router.get('results', Index.search) // 电影分类列表

module.exports = router.routes()
