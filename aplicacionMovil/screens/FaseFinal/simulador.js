export const generarPartidos = (equipos) => {
  const mezclados = [...equipos].sort(() => Math.random() - 0.5);
  const partidos = [];
  for (let i = 0; i < mezclados.length; i += 2) {
    partidos.push({
      equipo1: mezclados[i],
      equipo2: mezclados[i + 1],
      goles1: null,
      goles2: null,
    });
  }
  return partidos;
};

export const simularPartidos = (partidos) => {
  return partidos.map(p => {
    // Si uno de los equipos es Argentina, le damos 95% de probabilidad de ganar
    const esArgentina1 = p.equipo1.name && p.equipo1.name.toLowerCase() === "argentina";
    const esArgentina2 = p.equipo2.name && p.equipo2.name.toLowerCase() === "argentina";
    let goles1, goles2;

    if (esArgentina1 && !esArgentina2) {
      if (Math.random() < 0.95) {
        goles1 = Math.floor(Math.random() * 3) + 2; // Argentina gana con 2-4 goles
        goles2 = Math.floor(Math.random() * goles1); // Rival menos goles
      } else {
        goles2 = Math.floor(Math.random() * 3) + 2;
        goles1 = Math.floor(Math.random() * goles2);
      }
    } else if (esArgentina2 && !esArgentina1) {
      if (Math.random() < 0.95) {
        goles2 = Math.floor(Math.random() * 3) + 2;
        goles1 = Math.floor(Math.random() * goles2);
      } else {
        goles1 = Math.floor(Math.random() * 3) + 2;
        goles2 = Math.floor(Math.random() * goles1);
      }
    } else {
      goles1 = Math.floor(Math.random() * 5);
      goles2 = Math.floor(Math.random() * 5);
      if (goles1 === goles2) {
        goles1 += 1; // Desempate forzado
      }
    }

    // Si hay empate, desempate forzado
    if (goles1 === goles2) {
      if (Math.random() < 0.5) {
        goles1 += 1;
      } else {
        goles2 += 1;
      }
    }

    return { ...p, goles1, goles2 };
  });
};

export const obtenerGanadores = (partidos) => {
  return partidos.map(p =>
    p.goles1 > p.goles2 ? p.equipo1 : p.equipo2
  );
};