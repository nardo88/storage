import axios from 'axios'
import {
    setFiles,
    addFile
} from '../redusers/fileReducer'

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/file${dirId ? '?parent='+dirId: ''}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message)
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


export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5000/api/file/upload`, formData, {

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                // эта функция позволяет на отслеживать прогресс загрузки
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress)
                    }
                }
            })
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}