import { View, Text } from 'react-native';
import styles from './Styles'

export default function InfoBox({ label, value, isDescription = false }) {
  if (isDescription) {
    return (
      <View style={styles.infoBoxDescripcion}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.valueDescription}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.infoBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}