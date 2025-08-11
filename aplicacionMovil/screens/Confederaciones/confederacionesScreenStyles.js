import { StyleSheet } from 'react-native';
import colors from "../../constants/constants";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  tableContainer: {
    marginBottom: 30,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  lastTwoRow: {
    backgroundColor: '#550000',
  },
  cell: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  headerCell: {
    fontWeight: 'bold',
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  redText: {
    color: '#ff5555',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
