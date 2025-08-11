const path = require('path');
const fs = require('fs');

const archivoApuestas = path.join(__dirname, '..', 'data', 'apuestas.json');
//console.log("Ruta del archivo de apuestas:", archivoApuestas); 


exports.getApuestas = (req, res) => {
  if (!fs.existsSync(archivoApuestas)) {
    return res.json([]);
  }

  fs.readFile(archivoApuestas, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error al leer las apuestas:", err);
      return res.status(500).json({ error: "Error al leer las apuestas" });
    }

    try {
      const apuestas = JSON.parse(data);
      res.json(apuestas);
    } catch (parseError) {
      console.error("Error al parsear JSON:", parseError);
      res.status(500).json({ error: "Error al procesar los datos" });
    }
  });
};

exports.addApuesta = (req, res) => {
  const { nombre, dni, pais, posicion, monto, fechaEnvio } = req.body; 

  // Validar que todos los campos estén presentes (podés incluir fechaEnvio si es obligatorio)
  if (!nombre || !dni || !pais || !posicion || !monto || !fechaEnvio) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  //console.log("Apuesta recibida:", { nombre, dni, pais, posicion, monto, fechaEnvio });

  // Leemos el archivo existente o creamos un array vacío
  let apuestas = [];
  if (fs.existsSync(archivoApuestas)) {
    const data = fs.readFileSync(archivoApuestas, 'utf-8');
    if (data.trim() !== "") {
      apuestas = JSON.parse(data);
    }
  }

  // Agregamos la nueva apuesta
  apuestas.push({ nombre, dni, pais, posicion, monto, fechaEnvio });

  // Guardamos el array actualizado en el archivo
  fs.writeFile(archivoApuestas, JSON.stringify(apuestas, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar la apuesta:", err);
      return res.status(500).json({ mensaje: "Error al guardar la apuesta" });
    }
    res.status(201).json({ mensaje: "Apuesta guardada correctamente" });
  });
};
