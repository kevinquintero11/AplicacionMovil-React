const express = require('express');
const router = express.Router();
const apuestasController = require('../controllers/apuestasController');

// Ruta para obtener todas las apuestas
router.get("/obtenerApuestas", apuestasController.getApuestas);

// Ruta para enviar una nueva apuesta
router.post("/enviarApuesta", apuestasController.addApuesta);

module.exports = router;