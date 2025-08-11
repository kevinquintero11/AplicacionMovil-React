import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'colors.background',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#302e2eff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    color: 'white',
  },
  customButton: {
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  }, 
  imageBackground: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  }
});
