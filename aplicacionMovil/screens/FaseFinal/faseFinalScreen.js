import React, { useEffect, useState, useCallback  } from 'react';
import { useFocusEffect, useRoute  } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity, Alert } from 'react-native';
import { generarPartidos, simularPartidos, obtenerGanadores } from './simulador';
import styles from './faseFinalScreenStyles';
import AdaptableButton from '../../components/Boton/Button';
import ViewSticky from '../../components/ViewSticky/viewSticky';
import { API_BASE_URL } from '../../constants/constants';
import PantallaCarga from '../../components/Texto/PantallaCarga';

import { obtenerClasificadosFaseFinal } from '../../Services/services';

let SIMULADA = false; // Cambiar a true para usar datos simulados
let PRIMER_INGRESO = true; // Cambiar a false para simular la fase de grupos
let fasesPrevias = [];

export const faseGruposSimulada = () => {
  SIMULADA = true;
}

export default function FaseFinalScreen() {
  const [fases, setFases] = useState([]);
  const [faseActual, setFaseActual] = useState(0);
  const [faseInicial, setFaseInicial] = useState([]);

  const nombresFases = [
    "16avos de final", "Octavos de final", "Cuartos de final",
    "Semifinal",  "Tercer puesto", "Final"
  ];

  const volverASimular = () => {
    setFaseActual(0);
    setFases([{ nombre: nombresFases[0], partidos: faseInicial }]);
  };

  useFocusEffect(
    useCallback(() => {
      if (SIMULADA) {
        obtenerClasificadosFaseFinal()
          .then(equipos => {
            const primeraFase = generarPartidos(equipos);
            setFaseInicial(primeraFase);
            setFaseActual(0);
            setFases([{ nombre: nombresFases[0], partidos: primeraFase }]);
          })
          .catch(err => console.error('Error al obtener clasificados:', err))
          .finally(() => {
            SIMULADA = false;
            PRIMER_INGRESO = false;
          });
      }
    }, [])
  );

  const simularSiguienteFase = () => {
    fasesPrevias = [...fases];

    // chequeo para salir si no existe la fase actual o no tiene partidos
    if (!fasesPrevias[faseActual] || !fasesPrevias[faseActual].partidos) return;

    const partidosActuales = fasesPrevias[faseActual].partidos;
    const partidosSimulados = simularPartidos(partidosActuales);
    fasesPrevias[faseActual].partidos = partidosSimulados;

    const ganadores = obtenerGanadores(partidosSimulados);

    if (ganadores.length === 2) {
        const final = generarPartidos(ganadores);
        const perdedores = partidosSimulados.map(p =>
            p.goles1 > p.goles2 ? p.equipo2 : p.equipo1
        );
        fasesPrevias.push({ nombre: nombresFases[faseActual + 1], partidos: generarPartidos(perdedores) });
        fasesPrevias.push({ nombre: nombresFases[faseActual + 2], partidos: final });
    } else if (ganadores.length === 1) {

        // Solo mostrar el alert si la fase actual es la final
        if (fasesPrevias[faseActual].nombre === "Final") {
            const ganadorFinal = ganadores[0];
            Alert.alert(
                "¡Final del torneo!",
                `El campeón es: ${ganadorFinal.name}`,
                [{ text: "OK" }]
            );
        }
    } else {
        const nuevaFase = generarPartidos(ganadores);
        fasesPrevias.push({ nombre: nombresFases[faseActual + 1], partidos: nuevaFase });
    }

    setFases(fasesPrevias);
    setFaseActual(faseActual + 1);
  };

  return (
    !PRIMER_INGRESO ? (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {fases.map((fase, index) => (
          <View key={index} style={styles.faseContainer}>
            <Text style={styles.faseTitulo}>{fase.nombre}</Text>
            {fase.partidos.map((p, idx) => {
              let esGanador1 = null, esGanador2 = null;
              if (p.goles1 !== null && p.goles2 !== null) {
                esGanador1 = p.goles1 > p.goles2;
                esGanador2 = p.goles2 > p.goles1;
              }
              return (
                <View key={idx} style={styles.card}>
                  <EquipoDisplay equipo={p.equipo1} goles={p.goles1} pos={1} esGanador={esGanador1} />
                  <Text style={styles.vs}>-</Text>
                  <EquipoDisplay equipo={p.equipo2} goles={p.goles2} pos={2} esGanador={esGanador2} />
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* Botón para simular la siguiente fase mientras no se hayan completado todas las fases */}
      {faseActual < 6 && (
        <ViewSticky>
          <AdaptableButton
            texto="Simular Fase"
            icono="play"
            onPress={simularSiguienteFase}/>
        </ViewSticky>

      )}

      {/* Si se simularon todas las fases hasta la final, agregar boton para volver a simular*/}
      {faseActual >= 6 && (
        <ViewSticky>
          <AdaptableButton
            texto="Volver a simular"
            icono="sync"
            onPress={() => {volverASimular()}}
          />
        </ViewSticky>
      )}
    </View> ) : (
      <PantallaCarga texto="Simule primero la fase de grupos" />
    )
  );
}

const EquipoDisplay = ({ equipo, goles, pos, esGanador }) => {
    const nombreCorto = equipo.name ? equipo.name.substring(0, 3).toUpperCase() : '';
    const nombreStyle = [
        styles.nombre,
        esGanador === true ? styles.nombreGanador : esGanador === false ? styles.nombrePerdedor : null
    ];
    if (pos === 1) {
        return (
            <View style={styles.equipo}>
              <Text style={nombreStyle}>{nombreCorto}</Text>
              <Image source={{ uri: equipo.flag }} style={styles.bandera} />
              <Text style={styles.goles}>{goles !== null ? goles : ""}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.equipo}>
              <Text style={styles.goles}>{goles !== null ? goles : ""}</Text>
              <Image source={{ uri: equipo.flag }} style={styles.bandera} />
              <Text style={nombreStyle}>{nombreCorto}</Text>
            </View>
        );
    }
};


