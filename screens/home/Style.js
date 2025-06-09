import { StyleSheet } from 'react-native'
export default StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  headerBox: {
    backgroundColor: '#96D289',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#122021',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
  },
  iconButton: {
    backgroundColor: '#96D289',
    padding: 10,
    borderRadius: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#96D289',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 28,
    color: '#122021',
  },
});