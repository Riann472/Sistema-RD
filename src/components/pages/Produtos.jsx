import styles from './Produtos.module.css'
import Button from '../l_products/Button'
import { useEffect, useState } from 'react'


export default function Produtos({ produtos, setProdutos }) {

    return (
        <section className={styles.produtos}>
            <div className={styles.limite}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PREÇO VENDA</th>
                            <th>CÓDIGO DE BARRAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.nome}</td>
                                <td>{e.preco_venda}</td>
                                <td>{e.gtin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.options}>
                <Button to='/produtos/newproduct' text="Cadastrar" />
            </div>
        </section>
    )
}