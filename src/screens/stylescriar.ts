import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8F8F8',
  },
    titleEstoque: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d9d9d9',
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#134E3A',
    marginBottom: 24,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    color: '#134E3A',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#134E3A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  uploadText: {
    fontSize: 16,
    color: '#134E3A',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#134E3A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
    loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 10,
  },
});

export default styles;
