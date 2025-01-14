import Caixa from '../../assets/caixa.png'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card({ title, img, link }) {
    return (

        <Link to={link}>
            <div className={styles.card}>
                <h1>{title}</h1>
                <img src={img} alt={title} />
            </div>
        </Link>

    )
}