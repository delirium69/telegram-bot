import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { run } from './src/bot'

const server = express()
const port = 8080
dotenv.config()

run()
server.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
