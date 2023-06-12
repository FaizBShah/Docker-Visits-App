const express = require('express')
const redis = require('redis')

const app = express()

const redisClient = redis.createClient({
    url: 'redis://redis-server:6379'
})

redisClient.connect()
// Setting initial no. of vists to zero in the redis server
redisClient.set('visits', 0)

app.get('/', async (req, res) => {
    try {
        const visits = +(await redisClient.get('visits'))
        await redisClient.set('visits', visits + 1)
        
        res.send(`Number of visits is ${visits + 1}`)
    } catch (error) {
        return res.status(500).json({ error })
    }
})

const PORT = 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))