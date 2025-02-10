import { useNavigate } from "react-router-dom";
import { FaPen, FaRegTrashCan } from "react-icons/fa6";
import styles from './ProductTable.module.css'
import axios from "axios";

function ProductTable({ filteredProducts, setFilteredProducts, products, setProducts }) {
    const navigate = useNavigate('')
    function handleEdit(produto) {
        navigate(`./editproduct/${produto.id}`, { state: { produto } })
    }

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja deletar esse produto?")) {
            axios.delete(`http://localhost:3001/produtos/delete/${id}`, {
                headers: { accessToken: sessionStorage.getItem('token') }
            })
                .then(res => {
                    if (res.data.error) {
                        alert(res.data.error)
                    } else {
                        setProducts(products.filter(e => e.id != id))

                        setFilteredProducts(products.filter(e => e.id != id))
                    }
                })
                .catch(err => {
                    alert("ERRO DE REQUISIÇÃO, contate a administração.")
                    console.log(err)
                })
        }
    }

    return (
        <div className={styles.limite}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>PREÇO VENDA</th>
                        <th>CÓDIGO DE BARRAS</th>
                        <th>OPÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(e.preco)}</td>
                            <td>{e.gtin}</td>
                            <td><div className="opcoes">
                                <FaPen value="teste" aria-label="Editar" onClick={() => handleEdit(e)} /> <FaRegTrashCan aria-label="Deletar" onClick={() => handleDelete(e.id)} />
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable