import { combineReducers } from "redux";
import formSlice from "./actions/formSlice";
import tokenSlice from "./actions/tokenSlice";

export const userReducer = combineReducers({
    login: tokenSlice,
    formulaire: formSlice,
})