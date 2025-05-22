import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateCard from './screens/CreateCard/CreateCard';

export default function App() {
  return (
    <CreateCard/>
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});