import fileService from "../servises/fileService.js"
import File from '../models/File.js'
import User from '../models/User.js'
import config from 'config'
import fs from 'fs'

class FileController {
    async createDir(req, res) {
        try {
            const {
                name,
                type,
                parent
            } = req.body
            const file = new File({
                name,
                type,
                parent,
                user: req.user.id
            })

            const parentFile = await File.findOne({
                _id: parent
            })
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()

            }
            await file.save()
            return res.json(file)
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)

        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({
                user: req.user.id,
                parent: req.query.parent
            })
            return res.json(files)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'can not get file'
            })
        }
    }

    async uploadFile(req, res) {
        try {
            // получаем файл
            const file = req.files.file
            // находим директорию в которой сохраним файл
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            // находим пользователя для того что бы проверить
            // есть ли у него место на диске
            const user = await User.findOne({_id: req.user.id})
            // если нет места возвращаем ошибку на клиент
            if(user.usedSpace + file.size > user.diskSpace){
                return res.status(400).json({message: 'no space'})
            }
            // если место есть то прибавляем размер нового файла
            user.usedSpace = user.usedSpace + file.size
            // получаем путь до будущего файла в зависимости от того есть ли родитель
            let path;
            if(parent){
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }
            // если файл по пути уже существует возвращаем ошибку на клиент
            if(fs.existsSync(path)){
                return res.status(400).json({message: 'File alredy exist'})
            }
            // mv - move file перемещаем файл
            file.mv(path)

            // получаем тип файла
            const type = file.name.split('.').pop()
            let filePath = file.name
            if(parent){
                filePath = parent.path + "\\" + file.name
            }
            // создаем документ для коллекции File для базы данных
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })
            // сохраняем изменения
            await dbFile.save()
            await user.save()

            // возвращаем на клиент сообщение о результате
            res.json(dbFile)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Upload Error',
                error
            })
        }
    }



    async downloadFile(req, res){
        try{
            // находим файл в базе который надо скачать
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            const path = config.get('filePath') + '\\' + req.user.id + '\\' + file.path + '\\' + file.name
            if(fs.existsSync(path)){
                return res.download(path, file.name)
            }
            return res.status(400).json({message: 'download error'})
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: 'dowload Error',
                error
            })
        }
    }

    async deleteFile(req, res){
        try{
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if(!file){
                return req.status(400).json({message: 'file not found'})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'success'})
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: 'Dir is not empty',
                error
            })
        }
    }
}

export default new FileController()