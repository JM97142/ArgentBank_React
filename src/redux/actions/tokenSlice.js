import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem('token');

const initialState = {
    token: accessToken || null,
};

const tokenSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        // Stocke le token si connecté
        loginSuccess: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        // Déconnexion
        logout: (state) => {
            state.token = null;
            return state
        },
    },
});
export const { loginSuccess, logout } = tokenSlice.actions;

export default tokenSlice.reducer;