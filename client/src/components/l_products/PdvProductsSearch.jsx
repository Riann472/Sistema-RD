import React, { useEffect, useRef } from 'react'

function PdvProductsSearch({ products, selectedIndex, setSelectedIndex }) {
    const tableRef = useRef(null); // Referência para o div da tabela

    useEffect(() => {
        if (selectedIndex >= 0 && tableRef.current) {
            const selectedRow = tableRef.current.querySelector(`tr[data-index="${selectedIndex}"]`);
            if (selectedRow) {
                selectedRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [selectedIndex]);



    return (
        <div ref={tableRef} >
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Produto</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((e, index) => (
                        <tr key={index} className={index === selectedIndex ? 'selected' : ''}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.preco}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PdvProductsSearch