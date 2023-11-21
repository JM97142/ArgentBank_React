import './error.css'

import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='error-wrapper'>
            <div className='error'>
                <h2 className='error-title'>404</h2>
                <p className='error-text'>Oups! La page que vous demandez n'existe pas.</p>
            </div>
            <div className='link-home'>
                <Link to="/">Retourner sur la page d'accueil</Link>
            </div>
        </div>
    )
}

export default Error