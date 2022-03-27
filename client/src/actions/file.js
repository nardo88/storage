import axios from 'axios'
import { setFiles } from '../redusers/fileReducer'

export const getFiles = (dirId) => {
    return async dispatch => {
        try{
            const response = await axios.get(`http://localhost:5000/api/file${dirId ? '?parent='+dirId: ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data));
        }catch(e){
            alert(e.response.data.message)
        }
    }
}