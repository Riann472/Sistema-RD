const express = require('express')
const auth = require('../middlewares/auth')
const { Produtos } = require('../models')

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const produtos = await Produtos.findAll()

    res.json(produtos)
})

router.post('/newproduct', auth, async (req, res) => {
    async function createProduct() {
        try {
            await Produtos.create(req.body)
            return res.json({ message: `Produto inserido com sucesso.` })
        } catch (err) {
            if (err.errors[0].path == "name" && err.errors[0].validatorKey == "not_unique") {
                return res.json({ error: "Já existe um produto com esse nome." })
            } else {
                return res.json({ error: "Erro ao cadastrar o produto, contate um administrador." })
            }
        }
    }

    if (req.body.gtin != "SEM GTIN") {
        const produto = await Produtos.findOne({ where: { gtin: req.body.gtin } })
        if (produto) {
            return res.json({ error: "Já existe um produto com esse codigo de barras." })
        } else {
            createProduct()
        }
    } else {
        createProduct()
    }
})

router.put(`/edit/:id`, auth, async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.id)
        if (!produto) {
            res.json({ error: "Produto não encontrado" })
        } else {
            await produto.update(req.body)
            res.json({ message: "Produto atualizado com sucesso!" })
        }
    } catch (err) {
        res.json({ error: "Erro ao editar o produto, contate um admin" })
    }
})

router.delete(`/delete/:id`, auth, async (req, res) => {
    try {
        await Produtos.destroy({ where: { id: req.params.id } })
        return res.json({ message: `Produto de id ${req.params.id} deletado com sucesso!` })
    } catch (err) {
        res.json({ error: "Falha ao deletar o produto, contate um administrador" })
    }
})

module.exports = router