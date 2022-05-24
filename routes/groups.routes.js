const _ = require('lodash')
const router = require('express').Router()

const Eater = require('../models/Eater.model')
const Restaurant = require('../models/Restaurant.model')
const Group = require('../models/Group.model')

function chunkEvenly(array, size) {
    const chunkedArray = _.chunk(array, size)

    if (chunkedArray.length < 2) {
        return size
    }

    const secondLastItem = _.nth(chunkedArray, -2)
    const lastItem = _.last(chunkedArray)

    if (secondLastItem.length - lastItem.length <= 1) {
        return size
    }

    return chunkEvenly(array, size - 1)
}

/**
 * The most challenging part of this iteration was to avoid 
 * having the same groups and leaders we had the previous week.
 * To achieve that: 
 * 
 * 1. I used the shuffle method on the eaters array,
 * which decrease the chance for the groups to be similar.
 * 
 * 2. I choose the leader from the eaters array with a random index. 
 * 
 * These methods above, don’t ensure 100 % to have different groups and
 * leaders we had the week before, but makes it pretty unlikely to happen.
 */

router.post('/create_groups', async (req, res) => {

    const eaters = await Eater.find()
    const restaurants = await Restaurant.find()
    const groups = await Group.find()

    /** 
     * To be able to compare the new group with the previos one, I created
     * weeks, so we don’t have to empty the data base to create new groups. 
     */

    const lastGroup = _.last(groups)
    const lastWeek = lastGroup?.week || 0

    // Gets a random index of the restaurants array
    const randomRestaurantIndex = _.random(0, restaurants.length - 1)
    const restaurantObject = restaurants[randomRestaurantIndex]

    // Shuffle eaters array to decrease the chance for the eaters to be grouped similar to the previous week.
    const shuffledEaters = _.shuffle(eaters)

    // Spare the eaters into even groups with size difference of 1 or less.
    const sizeEaters = chunkEvenly(shuffledEaters, 7)
    const groupsEaters = _.chunk(shuffledEaters, sizeEaters)

    const promises = groupsEaters.map(groupEaters => {
        const randomLeaderIndex = _.random(0, groupEaters.length - 1)
        const leaderObject = groupEaters[randomLeaderIndex]


        return Group.create({
            eaters: groupEaters.map(eater => eater.name),
            leader: leaderObject.name,
            restaurant: restaurantObject.name,
            week: lastWeek + 1
        })
    })

    Promise
        .all(promises)
        .then(groups => {
            res.json({ groups })
        })
        .catch(err => res.status(500).json(err))
})

router.get('/groups', (req, res) => {

    Group
        .find()
        .then(allGroups => {
            res.json({ allGroups })
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router