const _ = require('underscore')
const Movie = require('../models/movie')
const Comment = require('../models/comment')
const Category = require('../models/category')
const fs = require('fs')
const path = require('path')

// 电影详情
exports.detail = async function (ctx) {
  const id = ctx.params.id
  try {
    let movie = await Movie.findById(id)
    await Movie.update({_id: id}, {$inc: {pv: 1}})

    let comments = await Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec()
    await ctx.render('movie/detail', {
      title: '电影详情页——' + movie.title,
      movie: movie,
      comments: comments
    })
  } catch (e) {
    console.log(e)
  }
}

// 新增电影(回显数据)
exports.new = async function (ctx) {
  try {
    let categories = await Category.find({})
    await ctx.render('admin/movie_add', {
      title: '电影后台录入页',
      categories: categories,
      movie: {}
    })
  } catch (e) {
    console.log(e)
  }
}

// 更新电影(回显数据)
exports.update = async function (ctx) {
  const id = ctx.params.id
  try {
    if (id) {
      let movie = await Movie.findById(id)
      let categories = await Category.find({})
      await ctx.render('admin/movie_add', {
        title: '电影后台更新页',
        movie: movie,
        categories: categories
      })
    }
  } catch (e) {
    console.log(e)
  }
}

exports.savePoster = async function (ctx, next) {
  try {
    const posterData = ctx.request.body.files.uploadPoster
    const filePath = posterData.path
    const name = posterData.name

    if (name) {
      const reader = fs.createReadStream(filePath)

      const timestamp = Date.now()
      const type = posterData.type.split('/')[1]
      const poster = timestamp + '.' + type
      const newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
      const stream = fs.createWriteStream(newPath)
      reader.pipe(stream)

      ctx.poster = poster
    }
    await next()
  } catch (e) {
    console.log(e)
  }
}

// 新增电影 / 更新电影
exports.save = async function (ctx) {
  const id = ctx.request.body.fields._id
  const movie = ctx.request.body.fields
  let _movie

  try {
    if (ctx.poster) {
      movie.poster = ctx.poster
    }

    if (id) {
      let oldMovie = await Movie.findById(id)
      _movie = _.extend(oldMovie, movie)
      const newMovie = await _movie.save()

      const oldCategoryId = movie.oldCategory
      const categoryId = movie.category
      if (categoryId !== oldCategoryId) { // 更改类别，需要针对两个类别对里面的电影进行操作（增加，删除）
        await Category.findByIdAndUpdate({_id: categoryId}, {$addToSet: {movies: newMovie._id}})
        await Category.findByIdAndUpdate({_id: oldCategoryId}, {$pull: {movies: newMovie._id}})
      }
      ctx.redirect('/movie/' + movie._id)
    } else {
      _movie = new Movie(movie)
      let newMovie = await _movie.save()

      const categoryId = _movie.category
      const categoryName = movie.categoryName
      if (categoryId) {
        const category = await Category.findById(categoryId)
        category.movies.push(newMovie._id)

        await category.save()
      } else if (categoryName) {
        const category = new Category({
          name: categoryName,
          movies: [newMovie._id]
        })

        const newCategory = await category.save()
        newMovie.category = newCategory._id
        await newMovie.save()
      }
      ctx.redirect('/movie/' + newMovie._id)
    }
  } catch (e) {
    console.log(e)
  }
}

// 电影列表
exports.list = async function (ctx) {
  try {
    let movies = await Movie.fetch()
    await ctx.render('admin/movie_list', {
      title: '电影列表页',
      movies: movies
    })
  } catch (e) {
    console.log(e)
  }
}

// 删除电影
exports.del = async function (ctx) {
  const id = ctx.request.query.id
  let body = {success: 1}

  try {
    if (id) {
      await Movie.remove({_id: id})
    }
  } catch (e) {
    console.log(e)
    body = {success: 0}
  } finally {
    ctx.body = body
  }
}