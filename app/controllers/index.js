const Movie = require('../models/movie')
const Category = require('../models/category')

exports.index = async function (ctx) {
  try {
    const categories = await Category
      .find({})
      .populate({ path: 'movies', options: { limit: 20 } })
      .exec()
    await ctx.render('index', {
      title: '电影首页',
      categories
    })
  } catch (e) {
    console.log(e)
  }
}

exports.search = async function (ctx) {
  try {
    const catId = ctx.request.query.cat
    const q = ctx.request.query.q
    const page = parseInt(ctx.request.query.p, 10) || 0
    const count = 2
    const index = page * count

    if (catId) {
      const categories = await Category
        .find({ _id: catId })
        .populate({
          path: 'movies',
          select: 'title poster'
        })
        .exec()
      const category = categories[0] || {}
      const movies = category.movies || []
      const results = movies.slice(index, index + count)

      await ctx.render('movie/results', {
        title: '电影结果列表页面',
        keyword: category.name,
        currentPage: page + 1,
        query: 'cat=' + catId,
        totalPage: Math.ceil(movies.length / count),
        movies: results
      })
    } else {
      const movies = await Movie
        .find({ title: new RegExp(q + '.*', 'i') })
        .exec()
      const results = movies.slice(index, index + count)

      await ctx.render('movie/results', {
        title: '电影结果列表页面',
        keyword: q,
        currentPage: page + 1,
        query: 'q=' + q,
        totalPage: Math.ceil(movies.length / count),
        movies: results
      })
    }
  } catch (e) {
    console.log(e)
  }
}
