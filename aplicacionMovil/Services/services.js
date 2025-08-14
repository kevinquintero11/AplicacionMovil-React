import { API_BASE_URL } from '../constants/constants';  

// Devuelve un ranking paginado
export const obtenerRankingPaginado = async (pagina, pageSize) => {
  const from = pagina * pageSize;
  //console.log(`Fetching ranking from ${from} with page size ${pageSize}`);
  const response = await fetch(`${API_BASE_URL}/api/ranking?cantidad=${pageSize}&from=${from}`);

  if (!response.ok) {
    throw new Error('Error al obtener datos del ranking');
  }

  const result = await response.json();
  return result;
};

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

// Devuelve las apuestas guardadas
export const obtenerApuestas = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/apuestas/obtenerApuestas`);
    if (!res.ok) throw new Error('Error al obtener apuestas');
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

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






