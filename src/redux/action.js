const dataFetching = () => ({ type: 'loading' })
const dataError = () => ({ type: 'error' })
const actionConnexion = (data) => ({ type: 'connexion', payload: data })
const actionDeconnexion = () => ({ type: 'deconnexion' })

const databaseUrl = 'http://localhost:3001/api/v1'

// Fonction login
export function login(email, password) {
    return function (dispatch) {
        try {
            dispatch(dataFetching())
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ email: email, password: password })
            }
            fetch(databaseUrl + '/user/login', requestOptions).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        dispatch(actionConnexion(data))
                    })
                } else {
                    dispatch(dataError())
                }
            })
        } catch (error) {
            dispatch(dataError())
        }
    }
}

// Fonction déconnexion
export function deconnexion() {
    return function (dispatch) {
        dispatch(actionDeconnexion())
    }
}