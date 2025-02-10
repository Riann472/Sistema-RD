import { useEffect } from 'react'
import styles from './Pdv.module.css'
import { useNavigate } from 'react-router-dom'

export default function Pdv() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        }
    })
    return (
        <section className={styles.pdv}>

        </section>
    )
}