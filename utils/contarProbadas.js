function contarProbadas(calificaciones) {
    if (!Array.isArray(calificaciones)) return 0;
    return calificaciones.filter(c => c.probado).length;
}

module.exports = contarProbadas;
