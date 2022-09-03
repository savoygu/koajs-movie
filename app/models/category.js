const mongoose = require('mongoose')
const CategorySchema = require('../schemas/category')
const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
