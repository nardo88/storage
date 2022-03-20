import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fileReducer from './fileReducer'
import userReducer from './userReducer'

const rootReduser = combineReducers({
    user: userReducer,
    files: fileReducer
})

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))

export default store