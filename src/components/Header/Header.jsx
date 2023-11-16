import { Link } from 'react-router-dom'
import { deconnexion } from '../../redux/action'
import store from '../../redux/store'

import Logo from '../../assets/argentBankLogo.png'

function Header() {
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
            <div className='notConnected'>
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>Sign In
                </Link>
            </div>
            <div className='connected'>
                <Link className="main-nav-item" to='/' onClick={(e) => { store.dispatch(deconnexion()) }}>
                    <i className='fa-solid fa-arrow-right-from-bracket' />
                    <p> Sign out </p>
                </Link>
            </div>
        </nav>
    )
}

export default Header