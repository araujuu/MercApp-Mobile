import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 20,
    color: '#999',
    marginBottom: 40,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#145A44',
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#999',
    textDecorationLine: 'underline',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#145A44',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  register: {
    color: '#999',
    textDecorationLine: 'underline',
  },
});

export default styles;
