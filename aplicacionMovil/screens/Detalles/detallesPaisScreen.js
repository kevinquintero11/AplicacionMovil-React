import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import styles from './detallesPaisScreenStyles';
import InfoBox from '../../components/InfoBox/InfoBox';

export default function DetallesPaisScreen({ route }) {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{country.name}</Text>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <ScrollView>

        <InfoBox label="🏆 Rank:" value={country.rank} />
        <InfoBox label="🎯 Puntos:" value={country.points.toFixed(2)} />
        <InfoBox label="📊 Puntos previos:" value={country.previous_points.toFixed(2)} />
        <InfoBox label="🌍 Confederación:" value={country.confederation} />
        <InfoBox label="👥 Habitantes:" value={country.habitantes.toLocaleString()} />
        <InfoBox label="🏙 Capital:" value={country.capital} />
        <InfoBox label="🥇 Títulos oficiales:" value={country.titulos_oficiales} />
        <InfoBox label="📖 Descripción:" value={country.descripcion} isDescription />

      </ScrollView>
    </View>
  );
}
