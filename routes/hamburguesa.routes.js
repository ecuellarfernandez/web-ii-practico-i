module.exports = app=>{
    let router = require('express').Router();
    const controller = require("../controllers/hamburguesa.controller");
    router.get('/page', controller.listPage);
    router.get('/create', controller.getForm);
    router.post('/create', controller.postCreate);

    router.post('/delete/:id',controller.deleteHamburguesa);

    router.get('/:id', controller.getDetail);
    router.post('/:id/calificar', controller.postCalificacion);


    router.get('/:id/edit', controller.getEdit);
    router.post('/:id/edit', controller.postEdit);

    router.delete('/:id', controller.deleteHamburguesa);

    app.use('/hamburguesas', router);
}