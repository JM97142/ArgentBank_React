import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userInfo',
    initialState: {
        id: null,
        email: null,
        isOpen: false,
        firstName: null,
        firstNameEdit: null,
        lastName: null,
        lastNameEdit: null
    },
    reducers: {
        // Profil user
        setUserProfile: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen
        },
        // Action edit username
        editUserFirstame: (state) => {
            state.firstNameEdit = state.firstName
        },
        setUserFirstnameEdit: (state, action) => {
            state.firstNameEdit = action.payload
        },
        editUserLastname: (state) => {
            state.lastNameEdit = state.firstName
        },
        setUserLastnameEdit: (state, action) => {
            state.lastNameEdit = action.payload
        }
    }
})

// Export actions
export const { setUserProfile, toggleOpen, editUserFirstame, setUserFirstnameEdit, editUserLastname, setUserLastnameEdit } = userSlice.actions


export default userSlice.reducer