import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}