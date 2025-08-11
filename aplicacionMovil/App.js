import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/Home/homeScreen';
import ConfederacionesScreen from './screens/Confederaciones/confederacionesScreen';
import FaseFinalScreen from './screens/FaseFinal/faseFinalScreen';
import FaseGruposScreen from './screens/FaseGrupos/faseGruposScreen';
import RankingScreen from './screens/Ranking/rankingScreen';
import ApuestasScreen from './screens/Apuestas/apuestasScreen';
import DetallesPaisScreen from './screens/Detalles/detallesPaisScreen';
import DetallesApuestasScreen from './screens/Detalles/detallesApuestasScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Navegación por pestañas principales
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Confederaciones"
        component={ConfederacionesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fase Grupos"
        component={FaseGruposScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer-field" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fase Final"
        component={FaseFinalScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="podium-gold" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Apuestas"
        component={ApuestasScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegación principal con Stack (para detalles)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: 'rgb(16, 16, 16)' },
        }}
      >
        {/* Tabs como ventana principal */}
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        
        {/* Ventanas que no van en la barra inferior */}
        <Stack.Screen name="Detalles" component={DetallesPaisScreen} />
        <Stack.Screen name="Ver apuestas" component={DetallesApuestasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
