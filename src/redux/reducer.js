import { combineReducers } from "redux";
import { formSlice } from "./Slices/formSlice";

export const userReducer = combineReducers({
    formulaire: formSlice,
})