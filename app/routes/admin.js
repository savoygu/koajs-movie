const router = require('koa-router')()

const Permission = require('../middleware/permission')
const User = require('../controllers/user')
const Movie = require('../controllers/movie')
const Category = require('../controllers/category')
const body = require('koa-body')

router.use(Permission.signinRequired)
router.use(Permission.adminRequired)

// 用户
router.get('/user/list', User.list)// 用户列表

// 电影
router.get('/movie/new', Movie.new) // 新增电影(回显数据)
router.get('/movie/update/:id', Movie.update) // 更新电影(回显数据)
router.post('/movie', body({ multipart: true }), Movie.savePoster, Movie.save) // 新增电影 / 更新电影
router.get('/movie/list', Movie.list) // 电影列表
router.delete('/movie', Movie.del) // 删除电影

// 电影分类
router.get('/category/new', Category.new) // 新增电影分类(回显数据)
router.get('/category/update/:id', Category.update)
router.post('/category', Category.save) // 新增电影分类 / 更新电影
router.get('/category/list', Category.list) // 电影分类列表
router.delete('/category', Category.del) // 电影分类列表

module.exports = router.routes()
