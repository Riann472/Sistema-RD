import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './Produtos.module.css'
import Button from '../l_products/Button'
import Input from '../l_form/Input'


import { FaPen, FaRegTrashCan } from "react-icons/fa6";

export default function Produtos({ produtos, setProdutos }) {
    const navigate = useNavigate()

    let [pesquisaNome, setPesquisaNome] = useState()
    let [pesquisaGtin, setPesquisaGtin] = useState()
    let [produtosPesq, setProdutoPesq] = useState([])

    useEffect(() => {
        if (pesquisaNome == "" || pesquisaNome == undefined) {
            axios.get(`http://localhost:3000/produtos`)
                .then(res => setProdutoPesq(res.data))
        } else {
            axios.get(`http://localhost:3000/produtos`)
                .then(res => {
                    const produtosFiltrados = res.data.filter((produto) => {
                        return produto.nome.toLowerCase().startsWith(pesquisaNome.toLowerCase())
                    })
                    setProdutoPesq(produtosFiltrados)
                })
        }
    }, [pesquisaNome])
    useEffect(() => {
        if (pesquisaGtin === "" || pesquisaGtin === undefined) {
            axios.get(`http://localhost:3000/produtos`)
                .then(res => setProdutoPesq(res.data))
                .catch(err => console.error("Erro ao buscar produtos:", err));
        } else {
            console.log("Pesquisando por GTIN:", pesquisaGtin);
            axios.get(`http://localhost:3000/produtos`)
                .then(res => {
                    const produtosFiltrados = res.data.filter((produto) => {
                        return produto.gtin.toLowerCase().startsWith(pesquisaGtin.toLowerCase());
                    });
                    setProdutoPesq(produtosFiltrados);
                })
                .catch(err => console.error("Erro ao buscar produtos:", err));
        }
    }, [pesquisaGtin]);

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
                        {produtosPesq.map((e) => (
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
                <div className={styles.inp}>
                    <Input onChangeHandler={setPesquisaNome} type="text" text="Nome" name="nome" placeholder="Informe o nome do produto" />
                    <Input onChangeHandler={setPesquisaGtin} type="number" text="GTIN" name="codigo" placeholder="Informe o codigo de barras do produto" />
                </div>

            </div>
        </section>
    )
}