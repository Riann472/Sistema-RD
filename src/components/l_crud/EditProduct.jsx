import styles from './EditProduct.module.css'
import Input from '../l_form/Input'
import Button from '../l_form/Button'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function EditProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const { produto } = location.state

    let [nome, setNome] = useState(produto.nome)
    let [custo, setCusto] = useState(produto.custo)
    let [preco, setPreco] = useState(produto.preco_venda)
    let [gtin, setGtin] = useState(produto.gtin)
    let [balanca, setBalanca] = useState(produto.balanca)

    function editar(e) {
        e.preventDefault()

        axios.get(`http://localhost:3000/produtos/?gtin=${produto.gtin}`)
            .then(res => {
                console.log(res.data[0])
                console.log(produto)

                if (res.data.id != produto.id) {
                    alert("Código de barras ja cadastrado.")
                } else {
                    axios.put(`http://localhost:3000/produtos/${produto.id}`, {
                        id: e.id,
                        nome: nome,
                        custo: custo,
                        preco_venda: preco,
                        gtin: gtin,
                        balanca: balanca
                    }).then(() => navigate('../produtos'))
                        .catch((err) => console.log(err))
                }
            })

    }

    return (
        <section>
            <div className={styles.newp}>
                <h1>Cadastro de produto</h1>
                <form onSubmit={editar} action="#">
                    <Input value={nome} onChangeHandler={setNome} type="text" text="Nome" name="nome" placeholder="Informe o nome do produto" />
                    <Input value={custo} onChangeHandler={setCusto} type="number" text="Custo" name="custo" placeholder="Informe o custo do produto" />
                    <Input value={preco} onChangeHandler={setPreco} type="number" text="Preço" name="preco" placeholder="Informe o preço do produto" />
                    <Input value={gtin} onChangeHandler={setGtin} type="number" text="Código de barras" name="gtin" placeholder="Informe o código de barras do produto" />
                    <Input value={balanca} onChangeHandler={setBalanca} type="number" text="Código balança" name="balanca" placeholder="Informe o código da balança  " />
                    <Button text="Enviar" />
                </form>
            </div>
        </section>
    )
}