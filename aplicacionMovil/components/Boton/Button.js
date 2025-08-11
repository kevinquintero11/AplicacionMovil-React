import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './Styles'; 

// Boton adaptable con icono opcional
export default function AdaptableButton({ texto, icono, onPress, styleButton, styleText }) {
  const buttonStyle = styleButton ? styleButton : styles.button;
  const iconStyle = styles.icon;
  const textStyle = styleText ? styleText : styles.buttonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icono && ( <FontAwesome5 name={icono} size={20} color="white" style={iconStyle} />)} 
      <Text style={textStyle}>{texto}</Text>
    </TouchableOpacity>
  );
}