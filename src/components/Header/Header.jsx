import './header.css'

import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../redux/actions/loginSlice'

import Logo from '../../assets/argentBankLogo.png'

function Header() {
    const dispatch = useDispatch()

    const accessToken = useSelector((state) => {
        console.log(state)
        return state.user.login.token
    })
    const userName = useSelector((state) => {
        return state.user.user.userName
    })

    const actionLogOut = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={Logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div> {accessToken ? (
                <Link className="main-nav-item" to="/user">
                    <i className="fa fa-user"></i>
                    {userName}
                </Link>
            ) : (
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            )} {accessToken && (
                <Link className="main-nav-item" onClick={actionLogOut}>
                    <i className='fa-solid fa-arrow-right-from-bracket' />
                    Sign Out
                </Link>
            )}
            </div>
        </nav>
    )
}

export default Header