import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './rankingScreenStyles'; // Importación de estilos
import { useNavigation } from '@react-navigation/native';

import { obtenerRankingPaginado } from '../../Services/services.ranking'; 

const PAGE_SIZE = 11;

export default function RankingScreen() {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [page, setPagina] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [hayMas, setHayMasDatos] = useState(true);

  useEffect(() => {
    cargarMasDatos();
  }, []);

  const cargarMasDatos = async () => {
    if (cargando || !hayMas) return;

    setCargando(true);
    try {
      const result = await obtenerRankingPaginado(page, PAGE_SIZE);
      //console.log('Datos obtenidos:', result);

      if (result.length > 0) {
        setData(previous => {
          const ids = new Set(previous.map(i => i.id)); // Obtenemos los IDs (paises) existentes
          const nuevos = result.filter(i => !ids.has(i.id)); // Filtramos los nuevos
          return [...previous, ...nuevos];
        });
        setPagina(previous => previous + 1); // Incrementamos la página
        if (result.length < PAGE_SIZE) {
          setHayMasDatos(false); // Si no hay mas paises para cargar
        }
      }
    } catch (error) {
      console.error('Error al cargar datos del ranking:', error);
    } finally {
      setCargando(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalles', { country: item })} style={styles.card}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.rank, styles.headerText]}>Rank</Text>
        <View style={styles.flag} />
        <Text style={[styles.name, styles.headerText]}>País</Text>
        <Text style={[styles.points, styles.headerText]}>Puntos</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onEndReached={cargarMasDatos}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() =>
          cargando ? ( <ActivityIndicator size="small" color='#09ca43' />) : !hayMas ? ( <Text style={styles.loadingText}>No hay más paises</Text>) : null
        }
      />
    </View>
  );
}
