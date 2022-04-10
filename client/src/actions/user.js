import axios from 'axios'
import { API_URL } from '../config'
import { hideLoader, showLoader } from '../redusers/appReducer'
import {setUser} from '../redusers/userReducer'

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password
        })

        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }

}


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(token){
                const response = await axios.get(`${API_URL}api/auth/auth`, {headers: {Authorization: `Bearer ${token}`}})
                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            }
        } catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(token){
                dispatch(showLoader())
                const formData = new FormData()
                formData.append('file', file)
                const response = await axios.post(`${API_URL}api/file/avatar`, formData,  {headers: {Authorization: `Bearer ${token}`}})
                dispatch(setUser(response.data))
            }
        } catch (e) {
            console.log(e)
        } finally{
            dispatch(hideLoader())

        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            if(token){
                dispatch(showLoader())

                const response = await axios.delete(`${API_URL}api/file/avatar`,  {headers: {Authorization: `Bearer ${token}`}})
                dispatch(setUser(response.data))
            }
        } catch (e) {
            console.log(e)
        } finally{
            dispatch(hideLoader())

        }
    }
}