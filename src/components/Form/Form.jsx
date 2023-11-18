import React from "react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// Redux
import { setUsername, setPassword } from "../redux/features/formSlice";
import { loginSuccess } from "../redux/features/authSlice";
// API
import { userLogin } from "../../api/api";

export function Form() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector((state) => state.formulaire.username);
    const password = useSelector((state) => state.formulaire.password);
    const [rememberMe, setRememberMe] = useState(false);

    //Entrées du formulaire
    const handleUsernameChange = (event) => {
        dispatch(setUsername(event.target.value));
        console.log(userName);
    };
    const handlePasswordChange = (event) => {
        dispatch(setPassword(event.target.value));
        console.log(password);
    };
    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    //Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userName.trim() || !password.trim()) {
            alert("Username and password cannot be empty");
            return;
        }

        let infos = {
            userName: userName,
            password: password,
        };

        const response = await userLogin(infos);
        console.log(response);

        if (response.status === 200) {
            if (rememberMe) {
                localStorage.setItem("token", response.body.token);
            } else {
                localStorage.removeItem("token");
            }
            dispatch(loginSuccess(response.body.token));
            navigate("/user");
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            dispatch(loginSuccess(storedToken));
            navigate("/user");
        }
    }, [dispatch, navigate]);

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
                        value={password}
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