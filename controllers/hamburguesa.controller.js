const db = require('../models');
const path = require('path');

exports.listPage = async (req, res) => {
    const hamburguesas = await db.hamburguesa.findAll({
        include: ['restaurante']
    });

    res.render('pages/hamburguesas/listPage.ejs', { hamburguesas });
};

exports.postCalificacion = async (req, res) => {
    const { puntuacion, comentario, probado } = req.body;
    const hamburguesaId = req.params.id;

    try {
        await db.calificacion.create({
            puntuacion: parseInt(puntuacion),
            comentario,
            probado: probado === 'on',
            hamburguesaId
        });

        const hamburguesa = await db.hamburguesa.findByPk(hamburguesaId);
        res.redirect('/restaurantes/' + hamburguesa.restauranteId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la calificación');
    }
};
//crud
exports.getForm = async (req, res) => {
    const restaurantes = await db.restaurante.findAll();
    res.render('pages/hamburguesas/form.ejs', {
        hamburguesa: {},
        restaurantes,
        errors: null,
        editar: false
    });
};

exports.postCreate = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;
    const imagen = req.files?.imagen;
    const errors = {};

    if (!nombre) errors.nombre = 'Nombre obligatorio';
    if (!descripcion) errors.descripcion = 'Descripción requerida';
    if (!precio || isNaN(precio)) errors.precio = 'Precio inválido';
    if (!restauranteId) errors.restauranteId = 'Debe seleccionar un restaurante';
    if (!imagen) errors.imagen = 'Debe subir una imagen';

    if (Object.keys(errors).length > 0) {
        const restaurantes = await db.restaurante.findAll();
        return res.render('pages/hamburguesas/form.ejs', {
            hamburguesa: req.body,
            restaurantes,
            errors,
            editar: false
        });
    }

    const filename = Date.now() + path.extname(imagen.name);
    const imagePath = path.join(__dirname, '../public/uploads', filename);

    const nueva = await db.hamburguesa.create({
        nombre,
        descripcion,
        precio,
        imagen: filename,
        restauranteId
    });

    imagen.mv(imagePath, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al subir imagen');
        } else {
            res.redirect('/restaurantes/page');
        }
    });
};

exports.getEdit = async (req, res) => {
    const hamburguesa = await db.hamburguesa.findByPk(req.params.id);
    const restaurantes = await db.restaurante.findAll();
    res.render('pages/hamburguesas/form.ejs', {
        hamburguesa,
        restaurantes,
        errors: null,
        editar: true
    });
};

exports.postEdit = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;
    const hamburguesa = await db.hamburguesa.findByPk(req.params.id);
    const errors = {};

    if (!nombre) errors.nombre = 'Nombre obligatorio';
    if (!descripcion) errors.descripcion = 'Descripción requerida';
    if (!precio || isNaN(precio)) errors.precio = 'Precio inválido';

    if (Object.keys(errors).length > 0) {
        const restaurantes = await db.restaurante.findAll();
        return res.render('pages/hamburguesas/form.ejs', {
            hamburguesa: { ...hamburguesa.toJSON(), ...req.body },
            restaurantes,
            errors,
            editar: true
        });
    }

    hamburguesa.nombre = nombre;
    hamburguesa.descripcion = descripcion;
    hamburguesa.precio = precio;
    hamburguesa.restauranteId = restauranteId;
    await hamburguesa.save();

    res.redirect('/restaurantes/page');
};

exports.deleteHamburguesa = async (req, res) => {
    await db.hamburguesa.destroy({ where: { id: req.params.id } });
    res.redirect('/restaurantes/page');
};