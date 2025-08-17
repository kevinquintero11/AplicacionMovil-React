import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './confederacionesScreenStyles';

import AdaptableButton from '../../components/Boton/Button';
import ViewSticky from '../../components/ViewSticky/viewSticky';
import PantallaCarga from '../../components/Texto/PantallaCarga';

import { obtenerConfederaciones } from '../../Services/services.confederaciones';
import { moveCountry, guardarClasificados } from './functions';

export default function ConfederacionesScreen() {
  const [confederaciones, setConfederaciones] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerConfederaciones()
      .then(data => setConfederaciones(data))
      .catch(err => setError(err.message));
  }, []);

  if (!confederaciones) {
    return (
      <PantallaCarga texto={"Cargando confederaciones"} />
    );
  }

  const entries = Object.entries(confederaciones);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {entries.map(([confedName, equipos]) => (
          <View key={confedName} style={styles.tableContainer}>
            <Text style={styles.title}>{confedName}</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.headerCell]}>País</Text>
            </View>
            {equipos.map((equipo, idx) => {
              const isLastTwo = idx >= equipos.length - 2;
              return (
                <View
                  key={idx}
                  style={[styles.tableRow, isLastTwo && styles.lastTwoRow]} // Si isLastTwo es true se agrega el estilo lastTwoRow
                >
                  <Image source={{ uri: equipo.flag }} style={styles.flag} />
                  <Text style={[styles.cell, isLastTwo && styles.redText]}>{equipo.name}</Text>

                  <View style={[styles.cell, { flexDirection: 'row', justifyContent: 'space-around', flex: 0.7 }]}> 

                    <AdaptableButton
                      texto={'↑'}
                      onPress={() => moveCountry(confederaciones, setConfederaciones, confedName, idx, 'up' )}
                      styleButton={styles.button}
                      styleText={styles.buttonText}
                    />

                    <AdaptableButton
                      texto={'↓'}
                      onPress={() => moveCountry(confederaciones, setConfederaciones, confedName, idx, 'down' )}
                      styleButton={styles.button}
                      styleText={styles.buttonText}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
        <ViewSticky>
          <AdaptableButton
            texto="Guardar Clasificados"
            icono="save"
            onPress={() => guardarClasificados(confederaciones, setConfederaciones)}
          />
        </ViewSticky>
      
    </View>
  );
}
