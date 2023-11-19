import { combineReducers } from 'redux'
import formSlice from './actions/formSlice'
import loginSlice from './actions/loginSlice'

const userReducer = combineReducers({
    login: loginSlice,
    form: formSlice,
})

export default userReducer