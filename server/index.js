import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import router from './routers/auth.router.js'
import fileRouter from './routers/file.router.js'
import cors from 'cors'
// импортируем fileUpload для работы с файлами
import fileUpload from 'express-fileupload'

const PORT = config.get('serverPort')
const app = express()

app.use(express.json())
app.use(cors())

// использование fileUpload для работы с файлами
app.use(fileUpload({
    
}))

app.use('/api/auth', router)
app.use('/api/file', fileRouter)

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