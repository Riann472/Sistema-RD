import styles from './Produtos.module.css'
import Button from '../l_products/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export default function Produtos({ produtos, setProdutos }) {
    function handleEdit(produto) {
        console.log(produto)
    }
    function handleDelete(produto) {
        axios.delete(`http://localhost:3000/produtos/${produto.id}`)
    }
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
                            <th>OPÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.nome}</td>
                                <td>{e.preco_venda}</td>
                                <td>{e.gtin}</td>
                                <td><div className="opcoes">
                                    <FaPen value="teste" onClick={() => handleEdit(e)} /> <FaRegTrashCan onClick={() => handleDelete(e)} />
                                </div></td>
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