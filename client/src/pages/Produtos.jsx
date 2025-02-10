import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


import styles from './Produtos.module.css'
import { useContext } from "react";
import { AuthContext } from '../helpers/AuthContext'

import ProductTable from '../components/l_products/ProductTable';


export default function Produtos() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user.role == "funcionario" || !sessionStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    let [searchName, setSearchName] = useState("")
    let [searchGtin, setSearchGtin] = useState("")
    let [products, setProducts] = useState([])
    let [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos`, {
            headers:
                { accessToken: sessionStorage.getItem('token') }
        }).then(res => {
            setProducts(res.data)
        }).catch(err => {
            alert("Erro ao carregar os produtos, contate um admin.")
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const produtosFiltrados = products.filter(e => {
            const nomeMatch = searchName.trim() === "" || e.name.startsWith(searchName.toUpperCase());
            const gtinMatch = searchGtin.trim() === "" || e.gtin.startsWith(searchGtin);
            return nomeMatch && gtinMatch;
        });
        //parei no passo 4 do deepseek
        setFilteredProducts(produtosFiltrados);
    }, [searchName, searchGtin, products])

    return (
        <section className={styles.produtos}>
            <ProductTable filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} products={products} setProducts={setProducts} />

            <div className={styles.options}>
                <Link to='/produtos/newproduct' > Cadastrar</Link>
                <div className={styles.inp}>
                    <div className="inputContainer">
                        <label htmlFor="nome">Nome do produto</label>
                        <input type="text" text="Nome" onChange={(e) => setSearchName(e.target.value)} name="nome" placeholder="Informe o nome do produto" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="">Código de barras</label>
                        <input type="number" text="GTIN" onChange={(e) => setSearchGtin(e.target.value)} name="codigo" placeholder="Informe o codigo de barras do produto" />
                    </div>
                </div>
            </div>
        </section>
    )
}