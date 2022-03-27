import mongoose from 'mongoose'
import pkg from 'mongoose';
const {ObjectId} = pkg;

const File = new mongoose.Schema({
    name: {type: String, required: true}, // название файла
    type: {type: String, required: true}, // расширение файла
    accessLink: {type: String},
    size: {type: Number, default: 0}, // размер файла в байтах
    path: {type: String, default: ''}, // путь к файлу
    user: {type: ObjectId, ref: 'User'}, // ссылочный тип данных ссылаемся на модель User
    parent: {type: ObjectId, ref: 'File'}, // будет ссылаться на файл
    childs: [{type: ObjectId, ref: 'File'}], // будет ссылаться на все файлы которые находятся в этой же папке
    date: {type: Date, default: Date.now()}
})


export default mongoose.models.File || mongoose.model('File', File)
