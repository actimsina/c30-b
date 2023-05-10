const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: [10, 'review should be longer than 10 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Book', bookSchema)