const express = require('express')
const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/c30-b')
    .then(() => console.log('Conneted to mongodb server'))
    .catch((err) => console.log(err))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.use('/books', books_routes)

app.listen(3001, () => {
    console.log('server is running on port 3001')
})