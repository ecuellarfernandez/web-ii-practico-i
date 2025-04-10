const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Calificacion = sequelize.define('Calificacion', {
        puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comentario: {
            type: DataTypes.STRING,
        },
    });

    return Calificacion;
};