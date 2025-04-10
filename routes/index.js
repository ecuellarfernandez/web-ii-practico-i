module.exports = app =>{
    require('./home.routes')(app);
    require('./restaurante.routes')(app);
    require('./hamburguesa.routes')(app);
}