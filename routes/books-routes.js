const express = require('express')
const router = express.Router()
const Book = require('../models/Book')

router.route('/')
    .get((req, res) => {
        Book.find()
            .then((books) => res.json(books))
            .catch(err => console.log(err))

        // try {
        //     const books = await Book.find()
        //     res.json(books)
        // } catch (error) {
        //     console.log(error)
        // }
    })
    .post((req, res) => {
        Book.create(req.body)
            .then((book) => {
                res.status(201).json(book)
            })
            .catch(err => {
                res.status(400).json({ error: err.message })
            })
    })
    .put((req, res) => {
        res.status(405).json({ error: "method not allowed" })
    })
    .delete((req, res) => {
        Book.deleteMany()
            .then((result) => {
                res.json(result)
            })
            .catch(err => console.log(err))
    })

router.route('/:book_id')
    .get((req, res) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                res.json(book)
            }).catch(err => console.log(err))
    })
    .post((req, res) => {
        res.status(405).json({ error: "method not allowed" })
    })
    .put((req, res) => {
        Book.findByIdAndUpdate(
            req.params.book_id,
            { $set: req.body },
            { new: true }
        )
            .then((updated) => res.json(updated))
            .catch(err => console.log(err))
    })
    .delete((req, res) => {
        Book.findByIdAndDelete(req.params.book_id)
            .then((reply) => {
                res.json(reply)
            }).catch(err => console.log(err))
    })
module.exports = router

