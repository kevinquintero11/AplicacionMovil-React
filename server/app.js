// server/app.js
const express = require('express');
const path = require('path');
const equiposRoutes = require('./routes/equiposRouter');
const rankingRoutes = require('./routes/rankingRouter');
const apuestasRoutes = require('./routes/apuestasRouter');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/equipos', equiposRoutes);  // Rutas para los equipos
app.use('/api/ranking', rankingRoutes);  // Rutas para el ranking
app.use('/api/apuestas', apuestasRoutes);  // Rutas para las apuestas

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
