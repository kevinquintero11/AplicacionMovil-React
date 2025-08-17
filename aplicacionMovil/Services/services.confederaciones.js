import { API_BASE_URL } from "../constants/constants";

// Devuelve las confederaciones y sus equipos
export const obtenerConfederaciones = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/equipos/confederaciones`);
    if (!response.ok) {
      throw new Error('Error al obtener confederaciones');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en obtenerConfederaciones:', error);
    throw error;
  }
};

// Envía los equipos clasificados de las confederaciones
export const enviarClasificadosConfederaciones = async (clasificados) => {
    try {
    const res = await fetch(`${API_BASE_URL}/api/equipos/clasificados`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ equipos: clasificados }),
        });

    if (!res.ok) throw new Error('Error en el servidor');
    return await res.json();
  } catch (error) {
    throw error;
  }

}


