import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import thunkMiddleware from 'redux-thunk'

export const initialeState = {
    users: null,
    connected: false,
    status: 'void',
    user: {
        prenom: ' ',
        nom: ' '
    },
    token: '',
    error: null
}
const store = createStore(
    reducer
)

export default store