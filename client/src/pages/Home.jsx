import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '../components/l_layout/Card'
import Caixa from '../assets/caixa.png'
import Produtos from '../assets/produtos.svg'
import Clientes from '../assets/clientes.png'

import styles from './Home.module.css'
import { AuthContext } from '../helpers/AuthContext'

export default function Home() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    if (user.logged) {
        return (
            <section className={styles.home}>
                <Card title="PDV" img={Caixa} link="/pdv"></Card>
                {user.role != "funcionario" && <>
                    <Card title="Clientes" img={Clientes} link="/cliente"></Card>
                    <Card title="Produtos" img={Produtos} link="/produtos"></Card></>
                }

            </section>
        )
    }

}