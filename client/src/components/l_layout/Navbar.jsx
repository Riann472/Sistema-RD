import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import styles from './Navbar.module.css'
import { useContext } from 'react'
import { AuthContext } from '../../helpers/AuthContext'

export default function Navbar() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)
    function exit(e) {
        e.preventDefault()
        sessionStorage.removeItem('token')
        setUser({
            username: '',
            id: 0,
            logged: false
        })
        navigate('/login')
    }

    return (
        <nav className={styles.navbar}>
            <img src={Logo} alt="Logo" />
            <ul>
                {user.logged && <>
                    <li><Link to="/">Início</Link></li>
                    {user.role != 'funcionario' && (<li><a onClick={(e) => navigate('/register')}>Registrar</a></li>)}
                    <li><a onClick={(e) => exit(e)}>Sair</a></li>
                </>}
            </ul>
        </nav>
    )
}