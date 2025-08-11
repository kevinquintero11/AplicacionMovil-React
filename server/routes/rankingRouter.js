const express = require('express');
const router = express.Router();

const rankingController = require("../controllers/rankingController");

//agregado
const fs = require('fs');
const path = require('path');
let paginatedData;
const rankPath = path.join(__dirname, '../data/ranking.json');

// Endpoint para obtener el ranking con paginación
router.get('/', (req, res) => {
    // Obtiene los parámetros de la query, con valores por defecto
    const { cantidad = 10, from = 0 } = req.query;
    // Convierte los parámetros a enteros
    const cantidadLimitada = parseInt(cantidad, 10);
    const fromIndex = parseInt(from, 10);
   
    // Lee los datos del archivo JSON
    fs.readFile(rankPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }

        // Convierte el contenido del archivo en un objeto JSON
        const ranking = JSON.parse(data);

        // Verifica si el ranking es un array
        if (!Array.isArray(ranking)) {
            return res.status(400).json({ error: 'El formato de datos es incorrecto' });
        }

        // Obtiene el total de elementos
        const totalItems = ranking.length;
       
        // Si el parámetro 'from' está fuera del rango, devolvemos 0 elementos
        if (fromIndex >= totalItems) {
            return res.json([]);
        } else {
            // Realiza el "slice" para limitar la cantidad de elementos
            paginatedData = ranking.slice(fromIndex,fromIndex+ cantidadLimitada);
            // console.log("dataso ", paginatedData);

            // Devuelve los datos paginados
            res.json(paginatedData);
        }
    });
});

module.exports = router;