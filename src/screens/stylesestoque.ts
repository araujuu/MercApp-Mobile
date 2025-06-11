import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#255B4E',
    marginBottom: 20,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  deleteButtonText: {
    color: '#ccc',
    fontWeight: '500',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    flex: 1,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  createButtonText: {
    color: 'black',
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editButtonText: {
    color: '#ccc',
    fontWeight: '500',
  },

  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
    color: '#255B4E',
  },

  rowData: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
  },
});

export default styles;
