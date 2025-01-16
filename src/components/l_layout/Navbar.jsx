import { Link } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <img src={Logo} alt="Logo" />
            <ul>
                <li><Link to="./home">Home</Link></li>
            </ul>
        </nav>
    )
}