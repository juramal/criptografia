import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './components/Login.js';
import Criptografar from './components/Criptografar.js';
import Decriptar from './components/Decriptar.js';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Criptografar" component={Criptografar} />
            <Drawer.Screen name="Decriptar" component={Decriptar} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}