import { View, Text, Image } from 'react-native';
import styles from './Styles'

export default function EquipoDisplay({ equipo, goles, pos, esGanador }) {
    const nombreCorto = equipo.name ? equipo.name.substring(0, 3).toUpperCase() : '';
    const nombreStyle = [
        styles.nombre,
        esGanador === true ? styles.nombreGanador : esGanador === false ? styles.nombrePerdedor : null
    ];
    const contenido = [
    <Text key="nombre" style={nombreStyle}>{nombreCorto}</Text>,
    <Image key="bandera" source={{ uri: equipo.flag }} style={styles.bandera} />,
    <Text key="goles" style={styles.goles}>{goles !== null ? goles : ""}</Text>
     ];

  // Si pos === 2, invertimos el orden
  return (<View style={styles.equipo}>{pos === 1 ? contenido : contenido.reverse()}</View>);
};
