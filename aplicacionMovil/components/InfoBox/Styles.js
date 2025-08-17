import { StyleSheet } from "react-native"
import colors from "../../constants/constants";

export default StyleSheet.create({
  infoBox: {
    width: '100%',
    backgroundColor: colors.color222,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  label: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 7, 
    textAlign: 'left',
  },
  value: {
    color: 'white',
    fontSize: 16,
    flex: 3,
    textAlign: 'right',
  },
  infoBoxDescripcion: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: colors.color222,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  valueDescription: {
      color: 'white',
      fontSize: 16,
      flex: 2,
      textAlign: 'justify',
    },
});