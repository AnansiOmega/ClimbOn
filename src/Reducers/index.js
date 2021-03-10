import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import loader from './loader'
import loginErrors from './errors'
import otherUsers from './otherUsers'
import posts from './posts'
import comments from './comments'

export default combineReducers({
    auth,
    user,
    loader,
    otherUsers,
    loginErrors,
    posts,
    comments
})