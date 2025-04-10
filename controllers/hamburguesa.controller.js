const db = require('../models');
const path = require('path');
const fs = require('fs');
const calcularPromedio = require('../utils/calcularPromedio');
const contarProbadas = require('../utils/contarProbadas');

exports.deleteHamburguesa = async (req, res) => {
    const hamburguesa = await db.hamburguesa.findByPk(req.params.id);
    if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');

    // Eliminar la imagen del servidor
    const imagePath = path.join(__dirname, '../public/uploads', hamburguesa.imagen);
    fs.unlink(imagePath, (err) => {
        if (err) console.error('Error al eliminar la imagen:', err);
    });

    await hamburguesa.destroy();
    res.redirect('/hamburguesas/page');
}

exports.getDetail = async (req, res) => {
    const hamburguesa = await db.hamburguesa.findByPk(req.params.id, {
        include: ['restaurante', 'calificaciones']
    });

    if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');

    const promedio = calcularPromedio(hamburguesa.calificaciones);
    const probadas = contarProbadas(hamburguesa.calificaciones);

    res.render('pages/hamburguesas/detail.ejs', {
        hamburguesa,
        promedio,
        probadas
    });
};

exports.listPage = async (req, res) => {
    const hamburguesas = await db.hamburguesa.findAll({
        include: ['restaurante', 'calificaciones']
    });

    // Calcular el promedio para cada hamburguesa
    const hamburguesasConPromedio = hamburguesas.map(h => {
        const plain = h.get({ plain: true });
        return {
            ...plain,
            promedio: calcularPromedio(plain.calificaciones) || 'Sin calificaciones'
        };
    });

    res.render('pages/hamburguesas/listPage.ejs', { hamburguesas: hamburguesasConPromedio });
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

        res.redirect('/hamburguesas/' + hamburguesaId);
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
            res.redirect('/hamburguesas/page');
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

    res.redirect('/hamburguesas/page');
};