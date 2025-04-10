const db = require('../models');
exports.getHome = async (req, res) => {
    const restaurantes = await db.restaurante.findAll({
        include: ['hamburguesas']
    });

    const hamburguesas = await db.hamburguesa.findAll({
        order: [['createdAt', 'DESC']]
    });

    res.render('pages/index.ejs', {
        restaurantes,
        hamburguesas
    });
};
