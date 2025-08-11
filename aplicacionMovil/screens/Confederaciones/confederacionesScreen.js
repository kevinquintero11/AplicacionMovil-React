import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './confederacionesScreenStyles';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../../constants/constants';

import AdaptableButton from '../../components/Boton/Button';
import ViewSticky from '../../components/ViewSticky/viewSticky';
import PantallaCarga from '../../components/Texto/PantallaCarga';

import { confederacionesGuardadas } from '../FaseGrupos/faseGruposScreen';
import { obtenerConfederaciones } from '../../Services/services';

export default function ConfederacionesScreen() {
  const [confederaciones, setConfederaciones] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerConfederaciones()
      .then(data => setConfederaciones(data))
      .catch(err => setError(err.message));
  }, []);


  const moveCountry = (confedName, index, direction) => {
    setConfederaciones(prev => {
      const newConfeds = { ...prev };
      const equipos = [...newConfeds[confedName]];
    //  console.log(equipos);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= equipos.length) return prev;

      [equipos[index], equipos[newIndex]] = [equipos[newIndex], equipos[index]]; // invierte los equipos
      newConfeds[confedName] = equipos; // actualiza la confederación con el nuevo orden
      return newConfeds;
    });
  };

  const generarClasificados = () => {
    if (!confederaciones) return;

    const clasificados = {};
    Object.entries(confederaciones).forEach(([confedName, equipos]) => {
      clasificados[confedName] = equipos.slice(0, -2);
    });

    fetch(`${API_BASE_URL}/api/equipos/clasificados`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipos: clasificados }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al enviar los clasificados');
        return res.json();
      })
      .then(data => {
        //console.log('Clasificados enviados correctamente:', data);
        Alert.alert('Éxito', 'Los clasificados se guardaron correctamente.');
        confederacionesGuardadas(); // Indica que las confederaciones han sido guardadas
      })
      .catch(err => {
        console.error('Error al enviar los clasificados:', err.message);
      });
  };

  if (error) {
    return (
      <PantallaCarga texto={`Error: ${error}`} />
    );
  }

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
                      onPress={() => moveCountry(confedName, idx, 'up'  )}
                      styleButton={styles.button}
                      styleText={styles.buttonText}
                    />

                    <AdaptableButton
                      texto={'↓'}
                      onPress={() => moveCountry(confedName, idx, 'down'  )}
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
            onPress={generarClasificados}
          />
        </ViewSticky>
      
    </View>
  );
}
