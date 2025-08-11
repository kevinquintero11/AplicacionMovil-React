import React from 'react';
import { View } from 'react-native';
import styles from './Styles';

export default function ViewSticky({ children }) {
  return (
    <View style={styles.floatingButtonContainer}>
      {children}
    </View>
  );
}