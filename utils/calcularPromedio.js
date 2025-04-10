function calcularPromedio(calificaciones) {
    if (!Array.isArray(calificaciones) || calificaciones.length === 0) {
        return null;
    }

    const suma = calificaciones.reduce((acc, c) => acc + c.puntuacion, 0);
    return (suma / calificaciones.length).toFixed(1);
}

module.exports = calcularPromedio;
