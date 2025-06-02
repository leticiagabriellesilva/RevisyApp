import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateCard from './screens/CreateCard/CreateCard';
import ReadCard from './screens/ReadCard/ReadCard';

export default function App() {
  return (
    <ReadCard/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});