const express = require("express")
const bcrypt = require("bcryptjs")
const { Users } = require('../models')
const { sign } = require('jsonwebtoken')
const auth = require("../middlewares/auth")

const router = express.Router()

router.get('/', (req, res) => {
    res.json("teste")
})

router.post('/register', auth, async (req, res) => {
    if (req.data.role == "funcionario") {
        res.json({ error: "Somente donos e admins podem registrar." })
    } else {
        const { username, password, role } = req.body
        const user = await Users.findOne({ where: { username: username } })

        if (user) {
            res.json({ error: "Usuário já cadastrado, tente outro." })
        } else {
            bcrypt.hash(password, 10).then(async hash => {
                try {
                    await Users.create({ username: username, password: hash, role: role })
                    res.json({ message: `Usuário ${username} com o cargo de ${role} foi registrado com sucesso` })
                } catch (err) {
                    res.json({ error: `Falha ao registrar o usuário, contate a administração.` })
                }
            })
        }
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } })

    if (!user) {
        res.json({ error: "O usuário informado não existe ou está incorreto." })
    } else {
        bcrypt.compare(password, user.password).then(match => {
            if (!match) {
                res.json({ error: "Senha incorreta! Tente novamente." })
            } else {
                const token = sign({ username: username, id: user.id, role: user.role }, process.env.PAYLOAD)
                res.json({ token: token, username: user.username, id: user.id, role: user.role })
            }
        })
    }
})

router.get('/auth', auth, async (req, res) => {
    res.json(req.data)
})

router.get('/delete', async (req, res) => {
    await Users.drop()
    res.json("sucesso")
})

module.exports = router 