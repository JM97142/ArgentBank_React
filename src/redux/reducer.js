import { combineReducers } from "redux"
import formSlice from "./actions/formSlice"
import loginSlice from "./actions/loginSlice"

export const userReducer = combineReducers({
    login: loginSlice,
    formulaire: formSlice,
})