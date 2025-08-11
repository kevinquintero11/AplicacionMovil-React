import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles';

export default function PantallaCarga({texto}) {
    return(
        <View style={styles.centered}>
            <Text style={styles.loadingText}>{texto}...</Text>
        </View>
    )
}