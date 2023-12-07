import './header.css'

import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../redux/actions/loginSlice'

import Logo from '../../assets/argentBankLogo.png'
import userIcon from '../../assets/compte.png'

function Header() {
    const dispatch = useDispatch()
    // Récupération du token via state manager
    const accessToken = useSelector((state) => {
        return state.user.login.token
    })
    const userName = useSelector((state) => {
        console.log(userName)
        return state.user.user.userName
    })
    // Déconnexion
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
            <div className="main-nav-items">
                {accessToken ? (
                    <Link className="main-nav-links" to="/user">
                        <img src={userIcon} alt="user icon" />
                        {userName}
                    </Link>
                ) : (
                    <Link className="main-nav-links" to="/signin">
                        <img src={userIcon} alt="user icon" />
                        Sign In
                    </Link>
                )} {accessToken && (
                    <Link className="main-nav-links" onClick={actionLogOut}>
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Header