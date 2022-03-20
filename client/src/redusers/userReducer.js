const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const defaultState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                currentUser: action.user
            }
            case LOGOUT: 
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth: false,
                currentUser: {}
            }
        default:
            return state

    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        user: user
    }
}

export const logout = () => ({type: LOGOUT})