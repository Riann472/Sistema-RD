import { useNavigate } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({ to, text }) {
    const navigate = useNavigate()

    return (
        <button onClick={() => navigate(to)} className={styles.button}>{text}</button>
    )
}