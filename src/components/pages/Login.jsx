import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../l_form/Input'
import Button from '../l_form/Button'

import styles from './Login.module.css'

export default function Login() {
    const navigate = useNavigate(); //chamado do hook

    let [user, setUser] = useState('')
    let [pass, setPass] = useState('')

    // const getUser = e => setUser(e.target.value)
    // const getPass = e => setPass(e.target.value)

    function logar(e) {
        e.preventDefault()
        navigate('/home')
    }
  
    return (
        <div className={styles.container}>
            <h1>LOGIN</h1>
            <form action='#' onSubmit={logar} className={styles.form}>
                <Input name="user" onChangeHandler={setUser} placeholder="Usuário" type='text' text="Informe seu usuário" />
                <Input name="pass" onChangeHandler={setPass} placeholder="Senha" type='password' text="Informe sua senha" />
                <Button text="Enviar" />
            </form>
        </div>
    )
}