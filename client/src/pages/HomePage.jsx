import '../styles/css.css'
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div id='body-inicia'>
            <Link to={"/login"}>
                <button className='button-inicia'>Iniciar Sesion</button>
            </Link>
        </div>
    )
}

export default HomePage;