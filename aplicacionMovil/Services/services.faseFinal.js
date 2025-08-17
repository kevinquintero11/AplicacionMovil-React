import { API_BASE_URL } from '../constants/constants';  

// Devuelve los equipos clasificados para la fase final
export const obtenerClasificadosFaseFinal = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/equipos/clasificadosFaseFinal`);
    if (!res.ok) throw new Error('Error al obtener clasificados');
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

