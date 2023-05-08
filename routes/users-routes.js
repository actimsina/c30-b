const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const router = express.Router()

router.post('/register', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) return res.status(400)
                .json({ error: 'user already registered' })

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return res.status(500).json({ error: err.message })
                const user = {
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    fullname: req.body.fullname
                }
                User.create(user)
                    .then((user) => res.status(201).json(user))
                    .catch(next)
            })
        }).catch(next)
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(user => {
            if (!user) return res
                .status(401)
                .json({ error: 'user is not registered' })

            bcrypt.compare(password, user.password, (err, success) => {
                if (err) return res
                    .status(500)
                    .json({ error: err.message })

                if (!success) return res
                    .status(401)
                    .json({ error: 'password does not match' })
                const payload = {
                    id: user._id,
                    username: user.username,
                    fullname: user.fullname
                }

                jwt.sign(payload,
                    process.env.SECRET,
                    { expiresIn: '1d' }, (err, encoded) => {
                        if (err) res.status(500).json({ error: err.message })
                        res.json({
                            username: user.username,
                            token: encoded
                        })
                    })
            })
        }).catch(next)
})

module.exports = router
