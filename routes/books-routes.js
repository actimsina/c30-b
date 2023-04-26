const express = require('express')
const router = express.Router()
const Book = require('../models/Book')

router.route('/')
    .get((req, res, next) => {
        Book.find()
            .then((books) => res.json(books))
            .catch(next)
    })
    .post((req, res, next) => {
        Book.create(req.body)
            .then((book) => {
                res.status(201).json(book)
            })
            .catch(next)
    })
    .put((req, res) => {
        res.status(405).json({ error: "method not allowed" })
    })
    .delete((req, res, next) => {
        Book.deleteMany()
            .then((result) => {
                res.json(result)
            })
            .catch(next)
    })

router.route('/:book_id')
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then((book) => {
                if (!book) return res.status(404).json({ error: 'book not found' })
                res.json(book)
            }).catch(next)
    })
    .post((req, res) => {
        res.status(405).json({ error: "method not allowed" })
    })
    .put((req, res, next) => {
        Book.findByIdAndUpdate(
            req.params.book_id,
            { $set: req.body },
            { new: true }
        )
            .then((updated) => res.json(updated))
            .catch(next)
    })
    .delete((req, res, next) => {
        Book.findByIdAndDelete(req.params.book_id)
            .then((reply) => {
                res.status(204).end()
            }).catch(next)
    })
module.exports = router

