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
        e.preventDefault()
        const gtinFinal = gtin === undefined || gtin.trim() === "" ? "SEM GTIN" : gtin;

        if (gtinFinal === "SEM GTIN") {
            // Realiza o cadastro diretamente sem verificar o servidor
            axios.post("http://localhost:3000/produtos", {
                id: String(produtos.length), // Calculando o id de forma simples
                nome: nome,
                custo: parseFloat(custo),
                preco_venda: parseFloat(preco),
                gtin: gtinFinal,
                balanca: balanca
            })
                .then(res => {
                    console.log("Produto cadastrado:", res.data);
                    // Atualiza os produtos na página
                    axios.get("http://localhost:3000/produtos")
                        .then(res => {
                            setProdutos(res.data); // Atualiza a lista de produtos
                            navigate('../produtos');
                        });
                })
                .catch(err => console.error("Erro ao cadastrar produto:", err));
        } else {
            // Se o GTIN não for "SEM GTIN", faz a verificação no servidor
            axios.get(`http://localhost:3000/produtos?gtin=${gtinFinal}`)
                .then(res => {
                    if (res.data.length > 0) {
                        alert("PRODUTO JÁ CADASTRADO");
                    } else {
                        // Realiza o cadastro do produto
                        axios.post("http://localhost:3000/produtos", {
                            id: String(produtos.length), // Calculando o id de forma simples
                            nome: nome,
                            custo: parseFloat(custo),
                            preco_venda: parseFloat(preco),
                            gtin: gtinFinal,
                            balanca: balanca
                        })
                            .then(res => {
                                console.log("Produto cadastrado:", res.data);
                                // Atualiza os produtos na página
                                axios.get("http://localhost:3000/produtos")
                                    .then(res => {
                                        setProdutos(res.data); // Atualiza a lista de produtos
                                        navigate('../produtos');
                                    });
                            })
                            .catch(err => console.error("Erro ao cadastrar produto:", err));
                    }
                })
                .catch(err => console.error("Erro ao verificar GTIN:", err));
        }
    }


    return (
        <section className={styles.newp}>
            <div>
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