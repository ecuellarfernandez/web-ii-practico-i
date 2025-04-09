const {DataTypes} = require('sequelize');

module.exports = function (sequelize){
    const Calificacion = sequelize.define(
        'Calificacion',
        {
            puntuacion: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    min: 1,
                    max: 5,
                }
            },
            probado: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
    )
}