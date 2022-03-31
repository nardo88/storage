import fileService from "../servises/fileService.js"
import File from '../models/File.js'
import User from '../models/User.js'

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({
                name, 
                type, 
                parent,
                user: req.user.id
            })

            const parentFile = await File.findOne({_id: parent})
            if(!parentFile){
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
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'can not get file'})
        }
    }
}

export default new FileController()