import styles from './Produtos.module.css'
import Button from '../l_products/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export default function Produtos({ produtos, setProdutos }) {
    useEffect(() => {
        axios.get("http://localhost:3000/produtos")
            .then(res => setProdutos(res.data))
            .catch(err => console.error("Erro ao buscar produtos:", err));
    }, []);

    const navigate = useNavigate()

    function handleEdit(produto) {
        console.log(produto)
        navigate("./editproduct", { state: { produto } })
    }

    function handleDelete(produto) {
        axios.delete(`http://localhost:3000/produtos/${produto.id}`)
            .then(res => {
                axios.get("http://localhost:3000/produtos")
                    .then(res => setProdutos(res.data))
                    .catch(err => console.log(err))
            })
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
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.preco_venda)}</td>
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