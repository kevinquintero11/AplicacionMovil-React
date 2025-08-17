import { enviarClasificadosFaseFinal } from '../../Services/services.faseGrupos';
import { faseGruposSimulada } from '../FaseFinal/faseFinalScreen';
import { Alert } from 'react-native';

export const sortearEquipos = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generarGrupos = (equipos) => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grupos = {};
  const totalGrupos = Math.ceil(equipos.length / 4);
  for (let i = 0; i < totalGrupos; i++) {
    grupos[letras[i]] = equipos.slice(i * 4, i * 4 + 4);
  }
  return grupos;
};

export const simularResultados = (equipos) => {
  equipos.forEach((equipo) => {
    equipo.G = 0;
    equipo.E = 0;
    equipo.P = 0;
    equipo.GF = 0;
    equipo.GC = 0;
  });

  for (let i = 0; i < equipos.length; i++) {
    for (let j = i + 1; j < equipos.length; j++) {
      let resultado;
      let golesI = Math.floor(Math.random() * 4);
      let golesJ = Math.floor(Math.random() * 4);

      if (equipos[i].name === "Argentina" || equipos[j].name === "Argentina") {
        let prob = Math.random();
        resultado = prob < 0.95 ? (equipos[i].name === "Argentina" ? 1 : 2) : 0;
      } else {
        resultado = Math.floor(Math.random() * 3);
      }

      if (resultado === 0) {
        equipos[i].E++;
        equipos[j].E++;
      } else if (resultado === 1) {
        equipos[i].G++;
        equipos[j].P++;
      } else {
        equipos[j].G++;
        equipos[i].P++;
      }

      equipos[i].GF += golesI;
      equipos[i].GC += golesJ;
      equipos[j].GF += golesJ;
      equipos[j].GC += golesI;
    }
  }

  equipos.forEach((equipo) => {
    equipo.PJ = 3;
    equipo.DG = equipo.GF - equipo.GC;
    equipo.Pts = equipo.G * 3 + equipo.E;
  });

  equipos.sort((a, b) => {
    if (b.Pts === a.Pts) return b.DG - a.DG;
    return b.Pts - a.Pts;
  });
};

export const simularGrupos = async (grupos, setGrupos) => {
  if (Object.keys(grupos).length === 0) {
    throw new Error("Primero se deben generar los grupos.");
  }

  const nuevosGrupos = { ...grupos };
  const nuevosClasificados = [];
  const terceros = [];

  for (const letra in nuevosGrupos) {
    const equipos = nuevosGrupos[letra];
    simularResultados(equipos);
    nuevosClasificados.push(equipos[0], equipos[1]);
    terceros.push(equipos[2]);
  }

  terceros.sort((a, b) => {
    if (b.Pts === a.Pts) return b.DG - a.DG;
    return b.Pts - a.Pts;
  });

  nuevosClasificados.push(...terceros.slice(0, 8));

  setGrupos(nuevosGrupos);

  // Enviar los equipos clasificados a la fase final al servidor
  const data = await enviarClasificadosFaseFinal(nuevosClasificados);

  faseGruposSimulada();

  return data;
};

export const handleSimularGrupos = async (grupos, setGrupos) => {
  try {
    
    await simularGrupos(grupos, setGrupos);
    Alert.alert("Éxito", "Los clasificados a la fase final fueron enviados correctamente.");
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};