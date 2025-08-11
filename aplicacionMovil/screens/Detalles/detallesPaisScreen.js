import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import styles from './detallesPaisScreenStyles';

export default function DetallesPaisScreen({ route }) {
  const { country } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{country.name}</Text>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <ScrollView>

        <View style={styles.infoBox}>
          <Text style={styles.label}>🏆 Rank:</Text>
          <Text style={styles.value}>{country.rank}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>🎯 Puntos:</Text>
          <Text style={styles.value}>{country.points.toFixed(2)}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>📊 Puntos previos:</Text>
          <Text style={styles.value}>{country.previous_points.toFixed(2)}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>🌍 Confederación:</Text>
          <Text style={styles.value}>{country.confederation}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>👥 Habitantes:</Text>
          <Text style={styles.value}>{country.habitantes.toLocaleString()}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>🏙 Capital:</Text>
          <Text style={styles.value}>{country.capital}</Text>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.label}>🥇 Títulos oficiales:</Text>
          <Text style={styles.value}>{country.titulos_oficiales}</Text>
        </View>

        <View style={styles.infoBoxDescripcion}>
          <Text style={styles.label}>📖 Descripción:</Text>
          <Text style={styles.valueDescription}>{country.descripcion}</Text>
        </View>
        
      </ScrollView>
    </ScrollView>
  );
}
