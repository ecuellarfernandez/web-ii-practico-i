const path = require('path');
const db = require('../models/index');
const fs = require('fs');

exports.getRestauranteList = async (req, res) => {
    try {
        const restaurantes = await db.restaurante.findAll({ include: ['hamburguesas'] });
        res.render('pages/index.ejs', { restaurantes, mostrarControles:false});
    } catch (error) {
        console.error('Error al obtener la lista de restaurantes:', error);
        res.status(500).send('Ocurrió un error al obtener la lista de restaurantes.');
    }
};

exports.getRestauranteListPage = async (req, res) => {
    try{
        const restaurantes = await db.restaurante.findAll({
            include: ['hamburguesas'],
        });
        res.render('pages/restaurantes/listPage.ejs', { restaurantes });
    }catch(error){
        console.error('Error al obtener la lista de restaurantes:', error);
        res.status(500).send('Ocurrió un error al obtener la lista de restaurantes.');
    }
}

exports.getRestauranteCreate = async (req, res) => {
    res.render('pages/restaurantes/form.ejs', { restaurante: null, errors: null, editar:false });
};

exports.postRestauranteCreate = async (req, res) => {
    const { errors, restaurante } = validateRestaurante(req);

    if (errors) {
        return res.render('pages/restaurantes/form.ejs', { errors, restaurante });
    }

    const logo = req.files.logo;
    const logoFilename = Date.now() + path.extname(logo.name);
    const logoPath = path.join(__dirname, '../public/uploads', logoFilename);

    try {
        const nuevoRestaurante = await db.restaurante.create({
            nombre: restaurante.nombre,
            logo: logoFilename
        });

        logo.mv(logoPath, (err) => {
            if (err) {
                console.error(err);
                return res.render('pages/restaurantes/form.ejs', {
                    errors: { message: 'Error al guardar la imagen' },
                    restaurante
                });
            }

            res.redirect('/restaurantes/page');
        });

    } catch (error) {
        console.error(error);
        res.status(500).render('pages/restaurantes/form.ejs', {
            errors: { message: 'Error en la base de datos' },
            restaurante
        });
    }
};

function validateRestaurante(req) {
    const { nombre } = req.body;
    const logo = req.files?.logo;
    const errors = {};

    if (!nombre) {
        errors.nombre = 'El nombre es obligatorio';
    }
    if (!logo) {
        errors.logo = 'El logo es obligatorio';
    }

    if (Object.keys(errors).length > 0) {
        errors.message = 'Todos los campos son requeridos';
        return { errors, restaurante: req.body };
    }

    return { errors: null, restaurante: { nombre } };
}

//edit y delete
exports.getRestauranteEdit = async (req, res) => {
    const restaurante = await db.restaurante.findByPk(req.params.id);
    if (!restaurante) return res.status(404).send('No encontrado');

    res.render('pages/restaurantes/form.ejs', {
        restaurante,
        errors: null,
        editar: true
    });
};

exports.postRestauranteEdit = async (req, res) => {
    const { nombre } = req.body;
    const restaurante = await db.restaurante.findByPk(req.params.id);

    if (!restaurante) return res.status(404).send('No encontrado');

    if (!nombre) {
        return res.render('pages/restaurantes/form.ejs', {
            restaurante,
            errors: { nombre: 'El nombre es obligatorio', message: 'Falta completar el nombre' },
            editar: true
        });
    }

    restaurante.nombre = nombre;
    await restaurante.save();

    res.redirect('/restaurantes/page');
};

exports.deleteRestaurante = async (req, res) => {
    const restaurante = await db.restaurante.findByPk(req.params.id);
    if (!restaurante) return res.status(404).send('Restaurante no encontrado');

    // Eliminar el logo del servidor
    const logoPath = path.join(__dirname, '../public/uploads', restaurante.logo);
    fs.unlink(logoPath, (err) => {
        if (err) console.error('Error al eliminar el logo:', err);
    });

    await restaurante.destroy();
    res.redirect('/restaurantes/page');
};

//detail
exports.getRestauranteDetail = async (req, res) => {
    try {
        const restaurante = await db.restaurante.findByPk(req.params.id, {
            include: ['hamburguesas']
        });

        if (!restaurante) return res.status(404).send('Restaurante no encontrado');

        // Para cada hamburguesa, podrías incluir calificaciones si lo deseas
        res.render('pages/restaurantes/detail.ejs', { restaurante });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al cargar el restaurante');
    }
};

