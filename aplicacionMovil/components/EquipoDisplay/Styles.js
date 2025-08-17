import { StyleSheet } from "react-native"

export default StyleSheet.create({ 
  equipo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100, 
  },
  nombre: {
    color: 'white',
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  nombreGanador: {
    color: '#28a745', // verde
  },
  nombrePerdedor: {
    color: '#dc3545', // rojo
  },
  bandera: {
    width: 28,
    height: 20,
    marginHorizontal: 4,
    resizeMode: 'contain',
  },
  goles: {
    color: 'white',
    fontWeight: 'bold',
    width: 24, // ancho fijo para goles
    textAlign: 'center',
    marginHorizontal: 4,
  },
});