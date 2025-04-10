const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Hamburguesa = sequelize.define('Hamburguesa', {
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
    });

    return Hamburguesa;
};