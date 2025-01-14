import styles from './Produtos.module.css'
import Button from '../l_products/Button'

export default function Produtos() {
    return (
        <section className={styles.produtos}>
            <div className={styles.options}>
                <Button to='/produtos/newproduct' text="Cadastrar" />
            </div>
        </section>
    )
}