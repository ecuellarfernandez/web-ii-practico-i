const { sequelize } = require('../config/db.config');
const calificacion = require('./Calificacion')(sequelize);
const hamburguesa = require('./Hamburguesa')(sequelize);
const restaurante = require('./Restaurante')(sequelize);

// Relacion hamburguesa (1) - calificacion (N)
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

//Relacion restaurante (1) - hamburguesa (N)
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
    restaurante
};