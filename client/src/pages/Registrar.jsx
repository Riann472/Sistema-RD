import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { AuthContext } from "../helpers/AuthContext"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from './Form.module.css'
import Button from "../components/l_form/Button"
import axios from "axios"

function Registrar() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        if (user.role == "funcionario" || !user.logged) {
            console.log(user)
            navigate('/')
        }
    })

    const validationSchema = z.object({
        username: z.string().min(3, "Insira no minimo 3 caracteres").max(10, "Insira no maximo 10 caracteres"),
        password: z.string().min(4, "Insira no minimo 4 caracteres").max(20, "Insira no maximo 20 caracteres"),
        role: z.string()
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    })

    function registerUser(data) {
        axios.post(`http://localhost:3001/users/register`, data, {
            headers: { accessToken: sessionStorage.getItem('token') }
        }).then(res => {
            alert(res.data.message || res.data.error)
        }).catch(err => {
            alert(err)
        })
        reset()
    }

    return (
        <div className={styles.container}>
            <h1>REGISTRAR</h1>
            <form action='#' onSubmit={handleSubmit(registerUser)} className={styles.form}>
                <div className="inputContainer">
                    <label htmlFor="username">Usuário</label>
                    {errors.username && <span className={styles.error}>{errors.username.message}</span>}
                    <input id='username' {...register('username')} placeholder="Insira seu usuário" type='text' />
                </div>

                <div className="inputContainer">
                    <label htmlFor="password">Senha</label>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    <input id="password" {...register('password')} placeholder="Informe sua senha" type='password' />
                </div>

                <div className="inputContainer">
                    <label htmlFor="roles">Cargos</label>
                    <select {...register('role')} id="roles">
                        <option value="" selected disabled>Selecione um cargo.</option>
                        {user.role == "dono" && <option value="admin">Admin</option>}
                        <option value="funcionario">Funcionario</option>
                    </select>
                </div>
                <Button text="Enviar" />

            </form>
        </div>
    )
}

export default Registrar