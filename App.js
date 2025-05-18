import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Login from "./src/screens/Login.js";
import Criptografar from "./src/screens/Criptografar.js";
import Decriptar from "./src/screens/Decriptar.js";
import Register from "./src/screens/Register.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Criptografar"
        component={Criptografar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Decriptar"
        component={Decriptar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="lock-open"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.removeItem("token").then(() => {
      setIsAuthenticated(false);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // ou um splash/loading

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <>
                <Stack.Screen name="Login">
                  {(props) => (
                    <Login
                      {...props}
                      onLoginSuccess={async (token) => {
                        await AsyncStorage.setItem("token", token);
                        setIsAuthenticated(true);
                      }}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Registrar" component={Register} />
              </>
            ) : (
              <Stack.Screen name="Main" component={MainTabs} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
