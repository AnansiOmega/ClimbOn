import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import loader from './loader'
import loginErrors from './errors'
import otherUsers from './otherUsers'

export default combineReducers({
    auth,
    user,
    loader,
    otherUsers,
    loginErrors
})