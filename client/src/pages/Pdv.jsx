import { useEffect, useState } from 'react'
import styles from './Pdv.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PdvProductsSearch from '../components/l_products/PdvProductsSearch'
import PdvProducts from '../components/l_products/PdvProducts'

export default function Pdv() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [compra, setCompra] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login')
        } else {
            axios.get(`http://localhost:3001/produtos`, {
                headers: {
                    accessToken: sessionStorage.getItem('token')
                }
            }).then(res => {
                setProducts(res.data)
            })
        }
    }, [])

    useEffect(() => {
        setFilteredProducts(products.filter(e => {
            return search.trim() === "" || e.name.startsWith(search.toUpperCase());
        }))
    }, [search])

    const handleProductSelect = (product) => {
        setCompra([...compra, product])
        // Aqui você pode fazer algo com o produto selecionado, como adicioná-lo a um carrinho, exibir detalhes, etc.
        console.log(compra)
    };

    function handleInputKeydown(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault(); // Impede o comportamento padrão do input
            setSelectedIndex((prevIndex) => {
                if (e.key === 'ArrowUp') {
                    // Navega para cima
                    return Math.max(prevIndex - 1, 0);
                } else if (e.key === 'ArrowDown') {
                    // Navega para baixo
                    return Math.min(prevIndex + 1, filteredProducts.length - 1);
                }
                return prevIndex;
            });
        } else if (e.key === 'Enter') {
            // Captura o objeto selecionado ao pressionar Enter
            if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
                const selectedProduct = filteredProducts[selectedIndex];
                handleProductSelect(selectedProduct); // Função para lidar com o produto selecionado
                setSearch('')
            }
        }

    }

    return (
        <section className={styles.pdv}>
            <form action="#">
                <input type="text" value={search} onKeyDown={handleInputKeydown} onChange={(e) => setSearch(e.target.value)} placeholder='Produto ou código de barras...' /> {/* O problema do keydown */}
            </form>
            {search.length > 0 ? (
                <PdvProductsSearch products={filteredProducts} selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex} />
            ) : (
                <PdvProducts compra={compra} />
            )}


        </section>
    )
}