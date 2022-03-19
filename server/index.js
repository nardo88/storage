import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import router from './routers/auth.router.js'

const PORT = config.get('serverPort')
const app = express()

app.use(express.json())


app.use('/api/auth', router)

const start = async () => {
    try {
        mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}


start()