const controller = require("../controllers/home.controller");
module.exports = app =>{
    let router = require('express').Router();
    router.get('/', controller.getHome);
    app.use('', router);
}