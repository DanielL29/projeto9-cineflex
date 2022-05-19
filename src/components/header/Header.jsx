import { Link, useLocation } from 'react-router-dom'
import { HeaderContainer } from './HeaderStyle'

export default function Header({ previousPath }) {
    const location = useLocation()

    return (
        <HeaderContainer>
            {location.pathname === "/" ? "" : (
                <Link to={previousPath}>
                    <button>Voltar</button>
                </Link>
            )}
            <h1>CINEFLEX</h1>
        </HeaderContainer>
    )
}