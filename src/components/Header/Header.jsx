import './header.css'

import { Link } from 'react-router-dom'
// Redux
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../redux/actions/loginSlice'

import Logo from '../../assets/argentBankLogo.png'
import userIcon from '../../assets/compte.png'
import logOutIcon from '../../assets/deconnexion.png'

function Header() {
    const dispatch = useDispatch()
    // Récupération du token via state manager
    const accessToken = useSelector((state) => {
        return state.user.login.token
    })
    const userName = useSelector((state) => {
        return state.user.user.firstName
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
                    <div className="main-nav-links">
                        <img
                            src={userIcon}
                            alt="user icon"
                        />
                        <Link to="/user">
                            {userName}
                        </Link>
                    </div>
                ) : (
                    <div className="main-nav-links">
                        <img
                            className="main-nav-items-image"
                            src={userIcon}
                            alt="user icon"
                        />
                        <Link to="/signin">
                            Sign in
                        </Link>
                    </div>
                )} {accessToken && (
                    <div className="main-nav-links">
                        <img
                            className="main-nav-items-image"
                            src={logOutIcon}
                            alt="logout icon"
                        />
                        <Link onClick={actionLogOut}>
                            Sign out
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header