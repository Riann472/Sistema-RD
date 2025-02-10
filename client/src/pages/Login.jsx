import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'

import Button from '../components/l_form/Button'
import styles from './Form.module.css'

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/')
        }
    })

    const validationSchema = z.object({
        username: z.string({
            required_error: "Preencha o campo de usuário", // Mensagem de erro personalizada
        }).min(3, "Insira no minimo 3 caracteres").max(10, "Insira no maximo 10 caracteres"),
        password: z.string({
            required_error: "Preencha a senha"
        }).min(4, "Insira no minimo 4 caracteres").max(20, "Insira no maximo 20 caracteres")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    })

    function logar(data) {
        axios.post(`http://localhost:3001/users/login`, data)
            .then(res => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    sessionStorage.setItem('token', res.data.token)
                    setUser({
                        username: res.data.username,
                        id: res.data.id,
                        role: res.data.role,
                        logged: true
                    })
                    navigate('/')
                }
            })
    }

    return (
        <div className={styles.container}>
            <h1>LOGIN</h1>
            <form action='#' onSubmit={handleSubmit(logar)} className={styles.form}>
                <div className="inputContainer">
                    <label htmlFor="username">Usuário</label>
                    {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                    <input id='username'  {...register('username')} placeholder="Insira seu usuário" type='text' />
                </div>
                <div className="inputContainer">
                    <label htmlFor="password">Senha</label>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    <input id="password" {...register('password')} placeholder="Informe sua senha" type='password' />
                </div>
                <Button text="Enviar" />

            </form>
        </div>
    )
}