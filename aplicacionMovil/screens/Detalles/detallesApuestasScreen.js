import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './detallesApuestasScreenStyles';
import { obtenerApuestas } from '../../Services/services.apuestas';

export default function DetallesApuestasScreen() {
  const [apuestas, setApuestas] = useState([]);

  useEffect(() => {
    obtenerApuestas()
      .then(data => setApuestas(data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.row}>
      <Icon name="user" style={styles.icon} />
      <Text style={styles.text}>Nombre: {item.nombre}</Text>
    </View>

    <View style={styles.row}>
      <Icon name="id-card" style={styles.icon} />
      <Text style={styles.text}>DNI: {item.dni}</Text>
    </View>

    <View style={styles.row}>
      <Icon name="flag" style={styles.icon} />
      <Text style={styles.text}>País: {item.pais}</Text>
    </View>

    <View style={styles.row}>
      <Icon name="chart-line" style={styles.icon} />
      <Text style={styles.text}>Posición: {item.posicion}</Text>
    </View>

    <View style={styles.row}>
      <Icon name="money-bill-wave" style={styles.icon} />
      <Text style={styles.text}>Monto: ${item.monto}</Text>
    </View>

    <View style={styles.row}>
      <Icon name="calendar-alt" style={styles.icon} />
      <Text style={styles.text}>Fecha: {item.fechaEnvio}</Text>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apuestas guardadas</Text>
      <FlatList
        data={apuestas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      /> 
    </View>
  );
}
