import fs from 'fs' // модель предназначен для работы с файловой системой
import File from '../models/File.js'
import config from 'config'

class FileService {
    // создаем метод который будет содавать папки
    createDir(file) {
        // file - это объект модели File который будет добавляться в базу

        // создаем переменную куоторая будет хранить путь до будущего файла
        // Путь будет состоять из пути до папки, далее папка с ID пользователя 
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                // если файла не существует
                if (!fs.existsSync(filePath)) {
                    // то мы его создаем
                    fs.mkdirSync(filePath)
                    return resolve({
                        message: 'File was created'
                    })
                } else {
                    return reject({message: 'File already exist'})
                }
            } catch (e) {
                return reject({
                    message: 'File error'
                })
            }
        })

    }

    getPath(file){
        return config.get('filePath') + '\\' + file.user + '\\' + file.path
    }

    deleteFile(file){
        const path = this.getPath(file)
        if(file.type === 'dir'){
            fs.rmdirSync(path)
        } else {
           fs.unlinkSync(path) 
        }
    }
}

export default new FileService()