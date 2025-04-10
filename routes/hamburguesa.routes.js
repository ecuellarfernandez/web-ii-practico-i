module.exports = app=>{
    let router = require('express').Router();
    const controller = require("../controllers/hamburguesa.controller");
    router.post('/:id/calificar', controller.postCalificacion);
    router.get('/page', controller.listPage);

    router.get('/create', controller.getForm);
    router.post('/create', controller.postCreate);

    router.get('/:id/edit', controller.getEdit);
    router.post('/:id/edit', controller.postEdit);

    router.delete('/:id', controller.deleteHamburguesa);

    app.use('/hamburguesas', router);
}