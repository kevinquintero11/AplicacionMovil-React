import { API_BASE_URL } from '../constants/constants';  

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

// Envía una nueva apuesta al servidor
export const enviarApuesta = async (apuesta) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/apuestas/enviarApuesta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apuesta),
    });

    if (!res.ok) throw new Error('Error en el servidor');
    return await res.json();
  } catch (error) {
    throw error;
  }
};

