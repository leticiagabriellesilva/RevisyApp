import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateCard from './screens/CreateCard/CreateCard';
import ReadCard from './screens/ReadCard/ReadCard';
import HomeScreen from './screens/home/HomeScreen';

export default function App() {
  return (
    <HomeScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});