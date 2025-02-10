import styles from './NewProduct.module.css'
import formStyle from '../../pages/Form.module.css'
import Button from '../l_form/Button'
import { useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export default function NewProject({ produtos, setProdutos }) {
    const navigate = useNavigate();

    const validationSchema = z.object({
        name: z.string().min(1, "O nome do produto é obrigatorio"),
        preco: z.coerce.number().min(0.01, { message: "O preço deve ser maior que zero" }),
        custo: z.coerce.number().optional(),
        gtin: z.string().optional(),
        cod_balanca: z.string().optional()
    })

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    })


    function cadastrar(data) {
        const gtinFinal = data.gtin === undefined || data.gtin.trim() === "" ? "SEM GTIN" : data.gtin;
        const balancaFinal = data.balanca === undefined || data.balanca.trim() === "" ? "" : data.balanca;
        const finalData = { ...data, name: data.name.toUpperCase(), gtin: gtinFinal, cod_balanca: balancaFinal }

        axios.post(`http://localhost:3001/produtos/newproduct`, finalData, {
            headers: { accessToken: sessionStorage.getItem('token') }
        }).then(res => {
            if (res.data.error) {
                alert(res.data.error)
                navigate('/produtos')
            } else {
                navigate('/produtos')
            }
        }).catch(err => {
            alert("Erro ao inserir o produto, contate um administrador.")
        })
    }


    return (
        <section className={styles.newp}>
            <div className={styles.container}>
                <h1>Cadastro de produto</h1>
                <form onSubmit={handleSubmit(cadastrar)} action="#" className={formStyle.form}>
                    <div className="inputContainer">
                        <label htmlFor="nome">Nome do produto *</label>
                        {errors.name && <span className={formStyle.error}>{errors.name.message}</span>}
                        <input {...register("name")} type="text" id="nome" placeholder="Informe o nome do produto" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="custo">Custo do produto</label>
                        <input {...register("custo")} step="any" type="number" id="custo" placeholder="Informe o custo do produto" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="preco">Preço do produto *</label>
                        {errors.preco && <span className={formStyle.error}>{errors.preco.message}</span>}
                        <input {...register("preco")} step="any" type="number" id="preco" placeholder="Informe o preco do produto" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="gtin">Código de barras</label>
                        <input {...register("gtin")} type="text" id="gtin" placeholder="Informe o codigo de barras" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="gtin">Código balança</label>
                        <input {...register("cod_balanca")} type="text" id="gtin" placeholder="Informe o codigo da balança" />
                    </div>
                    <Button text="Enviar" />
                </form>
            </div>
        </section>
    )
}