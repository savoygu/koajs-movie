const router = require('koa-router')()
const Movie = require('../controllers/movie')

// 电影
router.get('/:id', Movie.detail) // 电影详情

module.exports = router.routes()
