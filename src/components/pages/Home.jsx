import Card from '../l_layout/Card'
import Caixa from '../../assets/caixa.png'
import Produtos from '../../assets/produtos.svg'
import Clientes from '../../assets/clientes.png'

import styles from './Home.module.css'

export default function Home() {
    return (
        <section className={styles.home}>
            <Card title="PDV" img={Caixa} link="/pdv"></Card>
            <Card title="Produtos" img={Produtos} link="/produtos"></Card>
            <Card title="Clientes" img={Clientes} link="/cliente"></Card>  
        </section>
    )
}