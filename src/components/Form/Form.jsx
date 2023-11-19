import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
// Redux
import { setUsername, setPassword } from '../../redux/actions/formSlice'
import { loginSuccess } from '../../redux/actions/loginSlice'
// API
import userLogin from '../../api/api'

export function Form() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector((state) => state.form.username)
    const userPassword = useSelector((state) => state.form.password)
    const [rememberMe, setRememberMe] = useState(false)

    //Entrées du formulaire
    const handleUsernameChange = (event) => {
        dispatch(setUsername(event.target.value))
        console.log(userName);
    }
    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value))
        console.log(userPassword);
    }
    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    }

    //Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userName.trim() || !userPassword.trim()) {
            console.log('Input vide')
            return
        }

        let infos = {
            userName: userName,
            password: userPassword,
        }

        const response = await userLogin(infos);

        if (response.status === 200) {
            if (rememberMe) {
                localStorage.setItem("token", response.body.token)
            } else {
                localStorage.removeItem("token")
            }
            dispatch(loginSuccess(response.body.token))
            navigate("/user")
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            dispatch(loginSuccess(storedToken))
            navigate("/user")
        }
    }, [dispatch, navigate])

    return (
        <section className='sign-in-content'>
            <i className='fa fa-user-circle sign-in-icon' />
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"
                        value={userName}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"
                        value={userPassword}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="input-remember">
                    <input type="checkbox" id="remember-me"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button type="submit" className="sign-in-button">
                    Sign In
                </button>
            </form>
        </section>
    )
}

export default Form