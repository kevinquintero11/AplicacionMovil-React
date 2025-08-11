import { StyleSheet } from "react-native";
import colors from "../../constants/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  faseContainer: {
    marginVertical: 10,
    paddingBottom: 70,
    borderBottomWidth: 1,
    borderColor: 'gray',
    alignItems: 'center', // Centra las tarjetas horizontalmente
  },
  faseTitulo: {
    color: 'orange',
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.card,
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ocupa todo el ancho disponible
    gap: 8,
  },
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
  vs: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 8,
  },
  
});
