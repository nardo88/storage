import axios from 'axios'
import { hideLoader, showLoader } from '../redusers/appReducer'
import {
    setFiles,
    addFile,
    deleteFileAction
} from '../redusers/fileReducer'
import { addUploaderFile, changeUploaderFile, showUploader } from '../redusers/uploadReducer'

export const getFiles = (dirId, sort) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = 'http://localhost:5000/api/file'
            if(dirId){
                url = `http://localhost:5000/api/file?parent=${dirId}`
            }
            if(sort){
                url = `http://localhost:5000/api/file?sort=${sort}`
            }
            if(sort && dirId){
                url = `http://localhost:5000/api/file?sort=${sort}&parent=${dirId}`

            }

            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message)
        } finally{
            dispatch(hideLoader())
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/file`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name: file.name, progress: 0, id: Date.now()} 
            dispatch(showUploader())
            dispatch(addUploaderFile(uploadFile))
            const response = await axios.post(`http://localhost:5000/api/file/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploaderFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export async function downloadFile(id, name){
    const response = await fetch(`http://localhost:5000/api/file/download?id=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status === 200){
        const blob = await response.blob()
        // с сервера мы получили наш файл в бинарном виде
        const downloadUrl = window.URL.createObjectURL(blob)
        // нам надо преобразовать его в нормальный файл
        // создаем невидимую ссылку
        const link = document.createElement('a')
        // прописываем ей все необходимы атрибуты
        link.href = downloadUrl
        link.download = name
        // добавляем ее в документ
        document.body.appendChild(link)
        // dspsdftv клик по ней
        link.click()
        // удаляем ссылку
        link.remove()
    }
}

export function deleteFile(id) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/file?id=${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(id))
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}


export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/file/search?search=${search}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data));


        } catch (e) {
            alert(e.response.data.message)
        }finally{
            dispatch(hideLoader())
        }
    }
}

