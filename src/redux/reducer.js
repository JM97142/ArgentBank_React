import { combineReducers } from 'redux'
import formSlice from './actions/formSlice'
import loginSlice from './actions/loginSlice'
import userSlice from './actions/userSlice'

const userReducer = combineReducers({
    login: loginSlice,
    form: formSlice,
    user: userSlice
})

export default userReducer