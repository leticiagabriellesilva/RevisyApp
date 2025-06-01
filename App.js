import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigaton from './navigations/MainNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigaton />
    </NavigationContainer>
  );
}