import express from 'express'
import dotenv from 'dotenv'
import { run } from './src/bot.js'

const server = express()
const port = process.env.PORT || 5000
dotenv.config()



server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

run();
