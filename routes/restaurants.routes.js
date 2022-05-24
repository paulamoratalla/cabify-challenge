const express = require('express')
const router = express.Router()

const Restaurant = require('./../models/Restaurant.model')

router.post('/restaurants', (req, res) => {

    const { name, address } = req.body

    Restaurant
        .create({ name, address })
        .then(() =>
            res.json({ "message": "created" }))
        .catch(err => res.status(500).json(err))
})

router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(500).json(err))
})

// Bonus feature: edit restaurant
router.put('/restaurants/:id', (req, res) => {

    const { name, address } = req.body
    const { id } = req.params

    Restaurant
        .findByIdAndUpdate(id, { name, address })
        .then(editedRestaurant => res.json(editedRestaurant))
        .catch(err => res.status(500).json(err))
})

// Bonus feature: delete especific restaurant 
router.delete('/restaurants/:id', (req, res) => {

    const { id } = req.params

    Restaurant
        .findByIdAndDelete(id)
        .then(() =>
            res.json({ "message": "restaurant removed" }))
        .catch(err => console.log(err))
});

module.exports = router