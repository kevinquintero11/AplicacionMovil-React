
import { StyleSheet } from "react-native"
import colors from "../../constants/constants";

export default StyleSheet.create({
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
