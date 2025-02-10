import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../components/l_layout/Card'
import Caixa from '../assets/caixa.png'
import Produtos from '../assets/produtos.svg'
import Clientes from '../assets/clientes.png'

import styles from './Home.module.css'

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        }
    })

    return (
        <section className={styles.home}>
            <Card title="PDV" img={Caixa} link="/pdv"></Card>
            <Card title="Produtos" img={Produtos} link="/produtos"></Card>
            <Card title="Clientes" img={Clientes} link="/cliente"></Card>
        </section>
    )
}