import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import loader from './loader'

export default combineReducers({
    auth,
    user,
    loader
})