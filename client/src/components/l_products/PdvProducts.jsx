import React from 'react'

function PdvProducts({ compra }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {compra.map((e, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.preco}</td>
                        <td>1</td>
                        <td>preco</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PdvProducts