import { StyleSheet } from 'react-native';
import colors from "../../constants/constants";

export default StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.background,
  },
  groupContainer: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 4,
  },
  headerText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  colNumero: {
    width: 30,
    marginRight: 5,
  },
  colEquipo: {
    width: 60,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  colStats: {
    width: 35,
    marginRight: 5,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 4,
    backgroundColor: colors.row,
    borderRadius: 6,
  },
  cell: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  equipoCell: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  flag: {
    width: 20,
    height: 15,
    marginRight: 4,
    borderRadius: 2,
  },
  teamName: {
    color: 'white',
    fontSize: 12,
  },
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
