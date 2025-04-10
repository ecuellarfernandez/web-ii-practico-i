module.exports = app =>{
    let router = require('express').Router();
    const controller = require('../controllers/restaurante.controller.js');
    router.get("/", controller.getRestauranteList);
    router.get("/", controller.getRestauranteList);
    router.get("/create", controller.getRestauranteCreate);
    router.post('/create', controller.postRestauranteCreate)
    router.get("/page", controller.getRestauranteListPage);

    router.get("/:id/edit", controller.getRestauranteEdit);
    router.post("/:id/edit", controller.postRestauranteEdit);
    router.post("/delete/:id", controller.deleteRestaurante);

    router.get("/:id", controller.getRestauranteDetail);

    app.use('/restaurantes',router);
}