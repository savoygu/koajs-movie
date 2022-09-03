const mongoose = require('mongoose')
const MovieSchema = require('../schemas/movie')
const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie
