import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header({ previousPath }) {
    const location = useLocation()

    return (
        <div className="header">
            {location.pathname === "/" ? "" : (
                <Link to={previousPath}>
                    <button>Voltar</button>
                </Link>
            )}
            <h1>CINEFLEX</h1>
        </div>
    )
}