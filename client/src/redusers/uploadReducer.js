const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_UPLOADER_FILE = 'REMOVE_UPLOADER_FILE'
const CHANGE_UPLOADER_FILE = 'CHANGE_UPLOADER_FILE'

const defaultState = {
    isVisible: false,
    files: []
}

export default function uploadReducer(state = defaultState, action) {
    switch (action.type) {
        case SHOW_UPLOADER: return {...state, isVisible: true}
        case HIDE_UPLOADER: return {...state, isVisible: false}
        case ADD_UPLOAD_FILE: 
            return {...state, files: [...state.files, action.payload ]}
        case REMOVE_UPLOADER_FILE:
            return {...state, files: state.files.filter(item => item.id != action.payload)}
        case CHANGE_UPLOADER_FILE:
            return {
                ...state,
                files: state.files.map(file => 
                    file.id === action.payload.id
                    ?{...file, progress: action.payload.progress}
                    :{...file}
                    )
            }
        default:
            return state

    }
}

export const showUploader = () => ({type: SHOW_UPLOADER})
export const hideUploader = () => ({type: HIDE_UPLOADER})
export const addUploaderFile = (file) => ({type: ADD_UPLOAD_FILE, payload: file})
export const removeUploaderFile = (fileId) => ({type: REMOVE_UPLOADER_FILE, payload: fileId})
export const changeUploaderFile = (payload) => ({type: REMOVE_UPLOADER_FILE, payload})


