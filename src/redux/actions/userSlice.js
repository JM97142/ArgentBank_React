import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        id: null,
        email: null,
        isOpen: false,
        userName: null,
        userNameEdit: null,
        firstName: null,
        lastName: null,
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.userName = action.payload.userName
        },
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        // Action edit username
        editUserName: (state) => {
            state.userNameEdit = state.userName
        },
        setUserNameEdit: (state, action) => {
            state.userNameEdit = action.payload
        },
    },
})

// Export actions
export const { setUserProfile, toggleOpen, editUserName, setUserNameEdit } = userSlice.actions


export default userSlice.reducer