import { enviarClasificadosConfederaciones } from '../../Services/services.confederaciones';
import { confederacionesGuardadas } from '../FaseGrupos/faseGruposScreen';
import { Alert } from 'react-native';


// Función para mover un país dentro de la confederación
export const moveCountry = (confederaciones, setConfederaciones, confedName, index, direction) => {
  setConfederaciones(prev => {
    const newConfeds = { ...prev };
    const equipos = [...newConfeds[confedName]];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= equipos.length) return prev;

    [equipos[index], equipos[newIndex]] = [equipos[newIndex], equipos[index]]; // intercambia los equipos
    newConfeds[confedName] = equipos;
    return newConfeds;
  });
};

// Función para guardar los equipos clasificados
export const guardarClasificados = async (confederaciones, setConfederaciones) => {
  if (!confederaciones) return;

  const clasificados = {};
  Object.entries(confederaciones).forEach(([confedName, equipos]) => {
    clasificados[confedName] = equipos.slice(0, -2);
  });

  try {
    await enviarClasificadosConfederaciones(clasificados);
    Alert.alert('Éxito', 'Los clasificados se guardaron correctamente.');
    confederacionesGuardadas();
  } catch (error) {
    console.error('Error al enviar los clasificados:', error);
    Alert.alert('Error', 'No se pudieron guardar los equipos clasificados');
  }
};
