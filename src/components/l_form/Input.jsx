import styles from './Input.module.css'

export default function Input({ onChangeHandler, value, type, text, name, placeholder }) {
    return (
        <div className={styles.input}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} id={name} value={value} onChange={onChangeHandler} placeholder={placeholder} />
        </div>
    )
}