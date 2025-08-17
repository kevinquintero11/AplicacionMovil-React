import { StyleSheet } from "react-native";
import colors from "../../constants/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  flag: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 2,
  },
});
