import { useState, useCallback } from 'react';
import { useFocusEffect} from '@react-navigation/native';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import styles from './faseGrupoScreenStyles';

import AdaptableButton from '../../components/Boton/Button';
import ViewSticky from '../../components/ViewSticky/viewSticky';
import PantallaCarga from '../../components/Texto/PantallaCarga';


import { obtenerEquiposClasificados } from '../../Services/services.faseGrupos';
import { sortearEquipos, generarGrupos, handleSimularGrupos } from './simulacion';

let PRIMER_INGRESO = true; 
let confederacionesCargadas = false; 

export const confederacionesGuardadas = () => {
  confederacionesCargadas = true;
}

export default function FaseGruposScreen() {
  const [grupos, setGrupos] = useState({});
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if(confederacionesCargadas || PRIMER_INGRESO){
        obtenerEquiposClasificados()
        .then(todosLosEquipos => {
          const equiposMezclados = sortearEquipos(todosLosEquipos);
          const gruposGenerados = generarGrupos(equiposMezclados);
          setGrupos(gruposGenerados);
        })
        .catch(err => console.error('Error al obtener equipos clasificados:', err))
        .finally(() => setLoading(false));
        confederacionesCargadas = false; 
        PRIMER_INGRESO = false; 
      }
    }, [])
  );

  if (loading) {
    return ( <PantallaCarga texto="Cargando fase de grupos" /> );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.entries(grupos).map(([letra, equipos]) => (
          <View key={letra} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>Grupo {letra}</Text>

            <View style={styles.headerRow}>
              <Text style={[styles.headerText, styles.colNumero]}>#</Text>
              <Text style={[styles.headerText, styles.colEquipo]}>EQUIPO</Text>
              <Text style={[styles.headerText, styles.colStats]}>PJ</Text>
              <Text style={[styles.headerText, styles.colStats]}>G</Text>
              <Text style={[styles.headerText, styles.colStats]}>E</Text>
              <Text style={[styles.headerText, styles.colStats]}>P</Text>
              <Text style={[styles.headerText, styles.colStats]}>GF</Text>
              <Text style={[styles.headerText, styles.colStats]}>PTS</Text>
            </View>

            {equipos.map((equipo, idx) => (
              <View key={idx} style={styles.teamRow}>
                <Text style={[styles.cell, styles.colNumero]}>{idx + 1}</Text>
                <View style={[styles.equipoCell, styles.colEquipo]}>
                  <Image source={{ uri: equipo.flag }} style={styles.flag} />
                  <Text style={styles.teamName}>{equipo.name.slice(0, 3).toUpperCase()}</Text>
                </View>
                <Text style={[styles.cell, styles.colStats]}>{equipo.PJ ?? '-'}</Text>
                <Text style={[styles.cell, styles.colStats]}>{equipo.G ?? '-'}</Text>
                <Text style={[styles.cell, styles.colStats]}>{equipo.E ?? '-'}</Text>
                <Text style={[styles.cell, styles.colStats]}>{equipo.P ?? '-'}</Text>
                <Text style={[styles.cell, styles.colStats]}>{equipo.GF ?? '-'}</Text>
                <Text style={[styles.cell, styles.colStats]}>{equipo.Pts ?? '-'}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <ViewSticky>
        <AdaptableButton
          texto="Simular Grupos"
          icono="play"
          onPress={() => handleSimularGrupos(grupos, setGrupos)}
        />
      </ViewSticky>
    </View>
  );
}
