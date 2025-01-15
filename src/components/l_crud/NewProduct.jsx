import styles from './NewProduct.module.css'
import Input from '../l_form/Input'
import Button from '../l_form/Button'
import { useState, useEffect } from 'react';

export default function NewProject() {
    let id = 0;
    let [nome, setNome] = useState('')
    let [custo, setCusto] = useState()
    let [preco, setPreco] = useState()
    let [gtin, setGtin] = useState()
    let [balanca, setBalanca] = useState()



    function cadastrar(e) {
        e.preventDefault();
        console.log(id)
        fetch("http://localhost:3000/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                custo: parseFloat(custo),
                preco_venda: parseFloat(preco),
                gtin: parseInt(gtin),
                balanca: parseInt(balanca)
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
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