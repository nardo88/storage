import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

const PORT = config.get('serverPort')
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.json('works')
})

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