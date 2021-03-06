import axios from 'axios'
import { API_URL } from '../config'
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
            let url = `${API_URL}api/file`
            if(dirId){
                url = `${API_URL}api/file?parent=${dirId}`
            }
            if(sort){
                url = `${API_URL}api/file?sort=${sort}`
            }
            if(sort && dirId){
                url = `${API_URL}api/file?sort=${sort}&parent=${dirId}`

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
            const response = await axios.post(`${API_URL}api/file`, {
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
            const response = await axios.post(`${API_URL}api/file/upload`, formData, {
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
    const response = await fetch(`${API_URL}api/file/download?id=${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if(response.status === 200){
        const blob = await response.blob()
        // ?? ?????????????? ???? ???????????????? ?????? ???????? ?? ???????????????? ????????
        const downloadUrl = window.URL.createObjectURL(blob)
        // ?????? ???????? ?????????????????????????? ?????? ?? ???????????????????? ????????
        // ?????????????? ?????????????????? ????????????
        const link = document.createElement('a')
        // ?????????????????????? ???? ?????? ???????????????????? ????????????????
        link.href = downloadUrl
        link.download = name
        // ?????????????????? ???? ?? ????????????????
        document.body.appendChild(link)
        // dspsdftv ???????? ???? ??????
        link.click()
        // ?????????????? ????????????
        link.remove()
    }
}

export function deleteFile(id) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/file?id=${id}`,{
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
            const response = await axios.get(`${API_URL}api/file/search?search=${search}`,{
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

