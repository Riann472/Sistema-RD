const { verify } = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header("accessToken")

    if (!token) {
        return res.json({ error: "O usuário não está autenticado." })
    } else {
        try {
            const data = verify(token, process.env.PAYLOAD, {
                onDelete: "CASCADE"
            })
            req.data = data
            return next()
        } catch (err) {
            return res.json({ error: err.message })
        }
    }
}

module.exports = auth