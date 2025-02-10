import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { FaPen, FaRegTrashCan } from "react-icons/fa6";

import styles from './Produtos.module.css'

export default function Produtos({ produtos, setProdutos }) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    let [pesquisaNome, setPesquisaNome] = useState("")
    let [pesquisaGtin, setPesquisaGtin] = useState("")
    let [produtosPesq, setProdutoPesq] = useState([])
    let [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos`, {
            headers:
                { accessToken: sessionStorage.getItem('token') }
        }).then(res => {
            setProdutoPesq(res.data)
            setAllProducts(res.data)
        }).catch(err => {
            alert("Erro ao carregar os produtos, contate um admin.")
            console.log(err)
        })
    }, [])

    useEffect(() => {
        // let produtosFiltrados = produtosPesq;

        // if (pesquisaNome.trim() !== "") {
        //     produtosFiltrados = produtosFiltrados.filter(e =>
        //         e.name.startsWith(pesquisaNome.toUpperCase())
        //     )
        // }

        // if (pesquisaGtin.trim() !== "") {
        //     produtosFiltrados = produtosFiltrados.filter(e =>
        //         e.gtin.startsWith(pesquisaGtin)
        //     )
        // }
        const produtosFiltrados = produtosPesq.filter(e => {
            const nomeMatch = pesquisaNome.trim() === "" || e.name.startsWith(pesquisaNome.toUpperCase());
            const gtinMatch = pesquisaGtin.trim() === "" || e.gtin.startsWith(pesquisaGtin);
            return nomeMatch && gtinMatch;
        });
        //parei no passo 4 do deepseek
        setAllProducts(produtosFiltrados);
    }, [pesquisaNome, pesquisaGtin, produtosPesq])

    function handleEdit(produto) {
        navigate(`./editproduct/${produto.id}`, { state: { produto } })
    }

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja deletar esse produto?")) {
            axios.delete(`http://localhost:3001/produtos/delete/${id}`)
                .then(res => {
                    if (res.data.error) {
                        alert(res.data.error)
                    } else {
                        setAllProducts(produtosPesq.filter(e => e.id != id))
                    }
                })
                .catch(err => {
                    alert("ERRO DE REQUISIÇÃO, contate a administração.")
                })
        }
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
                        {allProducts.map((e) => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.preco)}</td>
                                <td>{e.gtin}</td>
                                <td><div className="opcoes">
                                    <FaPen value="teste" onClick={() => handleEdit(e)} /> <FaRegTrashCan onClick={() => handleDelete(e.id)} />
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.options}>
                <Link to='/produtos/newproduct' > Cadastrar</Link>
                <div className={styles.inp}>
                    <div className="inputContainer">
                        <label htmlFor="nome">Nome do produto</label>
                        <input type="text" text="Nome" onChange={(e) => setPesquisaNome(e.target.value)} name="nome" placeholder="Informe o nome do produto" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="">Código de barras</label>
                        <input type="number" text="GTIN" onChange={(e) => setPesquisaGtin(e.target.value)} name="codigo" placeholder="Informe o codigo de barras do produto" />
                    </div>
                </div>

            </div>
        </section>
    )
}