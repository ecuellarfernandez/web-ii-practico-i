const {sequelize} = require('../config/db.config');

const calificacion = require('./calificacion')(sequelize);
const hamburguesa = require('./hamburguesa')(sequelize);
const restaurante = require('./restaurante')(sequelize);

// Relación hamburguesa (1) - calificación (N)
hamburguesa.hasMany(calificacion, {
    foreignKey: 'hamburguesaId',
    sourceKey: 'id',
    as: 'calificaciones',
    onDelete: 'CASCADE',
});
calificacion.belongsTo(hamburguesa, {
    foreignKey: 'hamburguesaId',
    sourceKey: 'id',
    as: 'hamburguesa',
});

// Relación restaurante (1) - hamburguesa (N)
restaurante.hasMany(hamburguesa, {
    foreignKey: 'restauranteId',
    sourceKey: 'id',
    as: 'hamburguesas',
    onDelete: 'CASCADE',
});
hamburguesa.belongsTo(restaurante, {
    foreignKey: 'restauranteId',
    sourceKey: 'id',
    as: 'restaurante',
});

module.exports = {
    calificacion,
    hamburguesa,
    restaurante,
    sequelize,
};