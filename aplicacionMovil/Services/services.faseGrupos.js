import { API_BASE_URL } from '../constants/constants';  

// Devuelve todos los equipos clasificados a la fase de grupos
export const obtenerEquiposClasificados = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/equipos/clasificados`);
    if (!response.ok) {
      throw new Error('Error al obtener equipos clasificados');
    }
    const data = await response.json();
    return Object.values(data).flat(); // Devuelve todos los equipos en un solo array plano
  } catch (error) {
    console.error('Error en obtenerEquiposClasificados:', error);
    throw error;
  }
};


export const enviarClasificadosFaseFinal = async (nuevosClasificados) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/equipos/clasificadosFaseFinal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ equipos: nuevosClasificados }),
  });

    if (!res.ok) throw new Error('Error en el servidor');
    return await res.json();
  } catch (error) {
    throw error;
  }
};



