const {DataTypes} = require('sequelize');

module.exports = function (sequelize, DataTypes){
    const Hamburgesa = sequelize.define(
        'Hamburgesa',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
            },
            precio: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING,
            },
        },
    )
}