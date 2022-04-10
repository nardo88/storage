import { Router } from "express";
import authMidleware from '../midleware/auth.midleware.js'
import fileController from "../controllers/fileController.js";
const router = new Router()


router.post('', authMidleware, fileController.createDir)
router.post('/avatar', authMidleware, fileController.uploadAvatar)
router.post('/upload', authMidleware, fileController.uploadFile)

router.get('', authMidleware, fileController.getFiles)
router.get('/download', authMidleware, fileController.downloadFile)
router.get('/search', authMidleware, fileController.searchFile)

router.delete('/', authMidleware, fileController.deleteFile)
router.delete('/avatar', authMidleware, fileController.deleteAvatar)



export default router
