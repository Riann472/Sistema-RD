import styles from './Input.module.css'

export default function Input({ onChangeHandler, value, type, text, name, placeholder }) {
    return (
        <div className={styles.input}>
            <label htmlFor={name}>{text}</label>
            <input  {...((name === "nome" || name === "preco" || name === "custo") ? { required: true } : {})} lang={type == 'number' ? 'pt-BR' : undefined} step={type == 'number' ? "0.01" : undefined} type={type} name={name} id={name} value={value} onChange={(e) => onChangeHandler(e.target.value)} placeholder={placeholder} />
        </div>
    )
}