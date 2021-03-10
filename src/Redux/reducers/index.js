import { combineReducers } from 'redux'
import user from './user_reducer'
import drive from './drive_reducer'

const rootReducer = combineReducers({
    user,
    drive
})

export default rootReducer