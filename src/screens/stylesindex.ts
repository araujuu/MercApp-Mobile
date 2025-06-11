import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 20,
    color: '#ABABAB',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  adminButton: {
    backgroundColor: '#255946',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  userButton: {
    backgroundColor: '#93BE84',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
