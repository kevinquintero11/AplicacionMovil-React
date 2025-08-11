import { StyleSheet } from "react-native";
import colors from "../../constants/constants";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgb(20,20,20)', padding: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    backgroundColor: colors.card,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    color: 'orange',
    fontSize: 16,
    marginRight: 4, 
    width: 24, 
  },
  text: {
    color: 'white',
    fontSize: 16,
  },

});
