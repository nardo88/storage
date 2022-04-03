import { Router } from "express";
import authMidleware from '../midleware/auth.midleware.js'
import fileController from "../controllers/fileController.js";
const router = new Router()


router.post('', authMidleware, fileController.createDir)

router.post('/upload', authMidleware, fileController.uploadFile)

router.get('', authMidleware, fileController.getFiles)

router.get('/download', authMidleware, fileController.downloadFile)

router.delete('/', authMidleware, fileController.deleteFile)

export default router
