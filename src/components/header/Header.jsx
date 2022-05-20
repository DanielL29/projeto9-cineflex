import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HeaderContainer } from './HeaderStyle'

export default function Header({ previousPath }) {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <HeaderContainer>
            {location.pathname === "/" ? "" : (
                <Link to={previousPath}>
                    <button>Voltar</button>
                </Link>
            )}
            <h1 onClick={() => navigate('/')}>CINEFLEX</h1>
        </HeaderContainer>
    )
}