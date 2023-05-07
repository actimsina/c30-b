const express = require('express')
const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes')
const users_routes = require('./routes/users-routes')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/c30-b')
    .then(() => console.log('Conneted to mongodb server'))
    .catch((err) => console.log(err))

app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello world')
})
app.use('/users', users_routes)
app.use('/books', books_routes)

// Error Handling middleware
app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === 'CastError') {
        res.status(400)
    } else if (err.name == 'ValidationError') {
        res.status(400)
    }
    res.json({ error: err.message })
})

// Unknown Path handling middleware
app.use((req, res) => {
    res.status(404).json({ error: 'path not found' })
})

app.listen(3001, () => {
    console.log('server is running on port 3001')
})