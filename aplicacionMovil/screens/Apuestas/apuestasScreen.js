import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ImageBackground } from 'react-native';
import styles from './apuestasScreenStyles'; // Importación de estilos
import { API_BASE_URL } from '../../constants/constants';
import AdaptableButton from '../../components/Boton/Button';
import fondo from '../../assets/images/fondo2.jpg'

const placeholderTextColor = "#b8b8b8ff";

export default function ApuestasScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [pais, setPais] = useState('');
  const [posicion, setPosicion] = useState('');
  const [monto, setMonto] = useState('');

  const obtenerFechaFormateada = () => {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');

    const hora = pad(now.getHours());
    const minutos = pad(now.getMinutes());
    const dia = pad(now.getDate());
    const mes = pad(now.getMonth() + 1); 
    const anio = now.getFullYear();

    return `${dia}/${mes}/${anio} - ${hora}:${minutos}hs`;
  };


  const enviarApuesta = () => {
    if (!nombre || !dni || !pais || !posicion || !monto) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    const fechaEnvio = obtenerFechaFormateada();

    fetch(`${API_BASE_URL}/api/apuestas/enviarApuesta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        dni,
        pais,
        posicion: parseInt(posicion, 10),
        monto: parseFloat(monto),
        fechaEnvio: fechaEnvio
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en el servidor');
        }
        return response.json();
      })
      .then(data => {
        Alert.alert('Éxito', 'Apuesta guardada correctamente');
      })
      .catch(error => {
        console.error('Error al guardar la apuesta:', error);
        Alert.alert('Error', 'No se pudo guardar la apuesta');
      }).finally(() => {
        setNombre(''); 
        setDni('');
        setPais('');
        setPosicion('');
        setMonto('');
      }); 
    } 

  return (
    
    <View style={styles.container}>
      <ImageBackground source={fondo} style={styles.imageBackground} resizeMode='cover'>
      <Text style={styles.title}>Realice su apuesta</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Nombre y apellido"
        placeholderTextColor= {placeholderTextColor}
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="DNI"
        placeholderTextColor={placeholderTextColor}
        keyboardType="numeric"
        value={dni}
        onChangeText={setDni}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del país"
        placeholderTextColor={placeholderTextColor}
        value={pais}
        onChangeText={setPais}
      />

      <TextInput
        style={styles.input}
        placeholder="Posición (número)"
        placeholderTextColor={placeholderTextColor}
        keyboardType="numeric"
        value={posicion}
        onChangeText={setPosicion}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto $$$"
        placeholderTextColor={placeholderTextColor}
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />

      <View >
        <AdaptableButton
          texto="Enviar Apuesta"
          icono="paper-plane"
          onPress={enviarApuesta} 
          styleButton={styles.customButton}
        />

        <AdaptableButton
          texto="Ver Apuestas"
          icono="eye"
          onPress={() => navigation.navigate('Ver apuestas')}
          styleButton={styles.customButton}
        />
      </View>
      </ImageBackground>
    </View>
  );
}
