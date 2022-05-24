const app = require('../app')
const mongoose = require('mongoose')
const request = require('supertest')

test("POST / eaters route works", async () => {
    const reqBody = {
        name: 'Teo',
        email: 'cabify@gmail.com'
    }
    const response = await request(app).post("/eaters").send(reqBody)
    expect(response.statusCode).toBe(200)
})

test("Empty key values should throw an error", async () => {
    const incompleteEaterPayload = {
        name: '',
        email: ''
    }
    const response = await request(app).post('/eaters').send(incompleteEaterPayload)
    expect(response.statusCode).toBe(500)
})

test("GET / eaters route works", async () => {
    const response = await request(app).get('/eaters')
    expect(response.statusCode).toBe(200)
})

test("DELETE / delete eaters and restaurants", async () => {
    const response = await request(app).delete('/eaters')
    expect(response.statusCode).toBe(200)
})

test("POST / restaurants route works", async () => {
    const reqBody = {
        name: 'McDonalds',
        address: 'Matadero'
    }
    const response = await request(app).post("/restaurants").send(reqBody)
    expect(response.statusCode).toBe(200)
})

test("Empty key values should throw an error", async () => {
    const incompleteEaterPayload = {
        name: '',
        address: ''
    }
    const response = await request(app).post('/restaurants').send(incompleteEaterPayload)
    expect(response.statusCode).toBe(500)
})

test("PUT / edit restaurant data", async () => {
    const restaurantPayload = {
        name: 'Restaurant1',
        address: 'Street1'
    }
    const response = await request(app).put('/restaurants/627e0844225ad43b06b6e57e').send(restaurantPayload)
    expect(response.statusCode).toBe(200)
})

test("DELETE / delete especific restaurant", async () => {
    const response = await request(app).delete('/restaurants/627e0844225ad43b06b6e57e')
    expect(response.statusCode).toBe(200)
})

test("POST / create_groups route works", async () => {
    const reqBody = {
        eaters: 'Luis',
        leader: 'Gema',
        restaurant: 'McDonalds',
        week: '1'
    }
    const response = await request(app).post("/create_groups").send(reqBody)
    expect(response.statusCode).toBe(200)
})

test("GET / groups route works", async () => {
    const response = await request(app).get('/groups')
    expect(response.statusCode).toBe(200)
})

afterAll(() => {
    mongoose.connection.close()
})