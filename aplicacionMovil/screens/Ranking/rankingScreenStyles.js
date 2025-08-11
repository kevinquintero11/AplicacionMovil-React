import { StyleSheet } from 'react-native';
import colors from "../../constants/constants";

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.row,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  rank: {
    width: 50,
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  flag: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  points: {
    width: 80,
    textAlign: 'right',
    fontSize: 14,
    color: '#ccc',
  },
  loadingText: {
    color: '#09ca43',
    textAlign: 'center',
    marginVertical: 10,
  },

})