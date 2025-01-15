import styles from './NewProduct.module.css'
import Input from '../l_form/Input'
import Button from '../l_form/Button'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewProject({ produtos, setProdutos }) {
    const navigate = useNavigate();

    let [nome, setNome] = useState('')
    let [custo, setCusto] = useState()
    let [preco, setPreco] = useState()
    let [gtin, setGtin] = useState()
    let [balanca, setBalanca] = useState()

    function cadastrar(e) {
        e.preventDefault();
        axios.post("http://localhost:3000/produtos", {
            id: String(produtos.length),
            nome: nome,
            custo: parseFloat(custo),
            preco_venda: parseFloat(preco),
            gtin: parseInt(gtin),
            balanca: parseInt(balanca)
        }).then(res => console.log(res))

        axios.get("http://localhost:3000/produtos").then(
            res => setProdutos(res.data)
        )
        alert("Cadastrado com sucesso!")
        navigate('../produtos')
    }

    return (
        <section className={styles.newp}>
            <div >
                <h1>Cadastro de produto</h1>
                <form onSubmit={cadastrar} action="#">
                    <Input onChangeHandler={setNome} type="text" text="Nome" name="nome" placeholder="Informe o nome do produto" />
                    <Input onChangeHandler={setCusto} type="number" text="Custo" name="custo" placeholder="Informe o custo do produto" />
                    <Input onChangeHandler={setPreco} type="number" text="Preço" name="preco" placeholder="Informe o preço do produto" />
                    <Input onChangeHandler={setGtin} type="number" text="Código de barras" name="gtin" placeholder="Informe o código de barras do produto" />
                    <Input onChangeHandler={setBalanca} type="number" text="Código balança" name="balanca" placeholder="Informe o código da balança  " />
                    <Button text="Enviar" />
                </form>
            </div>
        </section>
    )
}