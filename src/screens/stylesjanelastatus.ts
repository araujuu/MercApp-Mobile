import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    position: 'absolute',
    top: 75,// quanto menor, mais para cima
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d9d9d9',
},
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#134E3A',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#134E3A',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryLink: {
    fontSize: 14,
    color: '#134E3A',
    textDecorationLine: 'underline',
  },
});
