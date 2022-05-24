const express = require('express')
const router = express.Router()

const Eater = require('./../models/Eater.model')
const Restaurant = require('./../models/Restaurant.model')

router.post('/eaters', (req, res) => {

    const { name, email } = req.body

    Eater
        .create({ name, email })
        .then(newEater => res.json(newEater))
        .catch(err => res.status(500).json(err))
})

router.get('/eaters', (req, res) => {

    Eater
        .find()
        .then(eaters => res.json(eaters))
        .catch(err => res.status(500).json(err))
})

router.delete('/eaters', (req, res) => {

    const removeAll = [Eater.deleteMany(), Restaurant.deleteMany()]

    Promise
        .all(removeAll)
        .then(() =>
            res.json({ "message": "eaters and restaurants removed" }))
        .catch(err => res.status(500).json(err))
})
// Use of deleteMany() method instead of remove(), because remove() is depricated 

module.exports = router




