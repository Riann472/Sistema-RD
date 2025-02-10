module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define("Produtos", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        custo: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        gtin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cod_balanca: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

    return Produtos
}