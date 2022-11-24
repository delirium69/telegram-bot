import express from 'express'
import dotenv from 'dotenv'
import { run } from './src/bot.js'

const server = express()
const port = 5050
dotenv.config()

server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

console.log('before run')
run();
