const _ = require('underscore')
const Category = require('../models/category')

// 新增电影分类(回显数据)
exports.new = function (ctx) {
  ctx.render('admin/category_add', {
    title: '电影后台分类录入页',
    category: {
      name: ''
    }
  });
}

// 更新电影分类(回显数据)
exports.update = async function (ctx) {
  const id = ctx.params.id
  try {
    if (id) {
      let category = await Category.findById(id)
      ctx.render('admin/category_add', {
        title: '电影后台分类更新页',
        category: category
      })
    }
  } catch (e) {
    console.log(e)
  }
}

// 新增电影分类 / 更新电影分类
exports.save = async function (ctx) {
  const id = ctx.request.body.category._id
  const category = ctx.request.body.category
  let _category

  try {
    if (id) {
      let oldCategory = await Category.findById(id)
      _category = _.extend(oldCategory, category)
      await _category.save()

      ctx.redirect('/admin/category/list')
    } else {
      _category = new Category(category)
      await _category.save()

      ctx.redirect('/admin/category/list')
    }
  } catch (e) {
    console.log(e)
  }
}

// 电影分类列表
exports.list = async function (ctx) {
  try {
    let categories = await Category.fetch()
    return ctx.render('admin/category_list', {
      title: '电影分类列表页',
      categories: categories
    })
  } catch (e) {
    console.log(e)
  }
}


// 删除分类
exports.del = async function (ctx) {
  const id = ctx.request.query.id
  let body = {success: 1}

  try {
    if (id) {
      await Category.remove({_id: id})
    }
  } catch (e) {
    console.log(e)
    body = {success: 0}
  } finally {
    ctx.body = body
  }
}
