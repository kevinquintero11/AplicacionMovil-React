import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import icon from '../../assets/images/fondoOficial.png'; 
import styles from './homeScreenStyles'; 
import fondo from '../../assets/images/estadio.png';
import { StatusBar } from 'expo-status-bar';
import AdaptableButton from '../../components/Boton/Button';

export default function HomeScreen({ navigation }) {
  return(
      <ImageBackground source={fondo} style={styles.background} resizeMode='cover'>
        <StatusBar style="light" />
        <View style={styles.overlay}>
          <Text style={styles.title}>¡ Bienvenido !</Text>
          <Text style={styles.subtitle}>
            Copa Mundial de la FIFA
          </Text>

         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={[styles.subtitle, { color: '#B22234' }]}>Estados </Text>
          <Text style={[styles.subtitle, { color: '#FFFFFF' }]}>Unidos </Text>
          <Text style={[styles.subtitle, { color: '#3C3B6E' }]}>2026</Text>
        </View>
          <Text style={styles.description}>
            Simula resultados, crea predicciones y vive la Copa del Mundo 2026
          </Text>

          <Image
            source={icon}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <AdaptableButton 
            texto="Comenzar simulación"
            onPress={() => navigation.navigate('Confederaciones')}
            styleButton={styles.button}
          />

          <Text style={styles.copy}>© 2025 Kevin Quintero. Todos los derechos reservados.</Text>
        </View>
      </ImageBackground>
  );
}
