// server/controllers/equiposController.js
const path = require("path");
const fs = require("fs");
const confederacionesPath = path.join(__dirname, "../data/confederaciones.json");
const clasificadosPath = path.join(__dirname, "../data/clasificados.json");
const clasificadosFaseFinal = path.join(__dirname, "../data/clasificadosFasFinal.json");


// Función para obtener los equipos
exports.getEquiposClasificados = (req, res) => {
  
  const data = fs.readFileSync(clasificadosPath, "utf-8");
  const equipos = JSON.parse(data);

  res.json(equipos);
};

exports.getConfederaciones = (req, res) => {
  const data = fs.readFileSync(confederacionesPath, "utf-8");
  const equipos = JSON.parse(data);
  res.json(equipos);
};

exports.addClasificados = (req, res) => {
  const clasificados = req.body.equipos;

  if (!clasificados || clasificados.length === 0) {
    return res.status(400).json({ error: "No se proporcionaron equipos." });
  }

  fs.writeFile(
    clasificadosPath,
    JSON.stringify(clasificados, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el archivo." });
      }

      res
        .status(200)
        .json({ message: "Archivo de equipos creado correctamente." });
    }
  );
};

exports.addClasificadosFaseFinal = (req, res) => {
  const clasificados = req.body.equipos;

  if (!clasificados || clasificados.length === 0) {
    return res.status(400).json({ error: "No se proporcionaron equipos." });
  }

  fs.writeFile(
    clasificadosFaseFinal,
    JSON.stringify(clasificados, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el archivo." });
      }

      res
        .status(200)
        .json({ message: "Archivo de equipos creado correctamente." });
    }
  );
};

exports.getEquiposClasificadosFaseFinal = (req, res) => {
  
  const data = fs.readFileSync(clasificadosFaseFinal, "utf-8");
  const equipos = JSON.parse(data);

  res.json(equipos);
};
