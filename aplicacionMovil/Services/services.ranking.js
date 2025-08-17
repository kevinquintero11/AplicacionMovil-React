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