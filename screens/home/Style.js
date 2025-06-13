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
    padding: 70,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  icon: {
    width: 60,
    height: 60,
  },
  icon2: {
    width: 50,
    height: 50,
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
  reviewButton: {
  backgroundColor: '#AD94DB',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignSelf: 'center',
  marginTop: 15,
  marginBottom: 10,
},
reviewButtonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'normal',
},
});