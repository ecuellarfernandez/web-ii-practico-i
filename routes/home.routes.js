const controller = require("../controllers/restaurante.controller");
module.exports = app =>{
    let router = require('express').Router();
    router.get('/', controller.getRestauranteList);
    app.use('', router);
}