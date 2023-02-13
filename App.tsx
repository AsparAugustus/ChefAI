import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Picker } from '@react-native-picker/picker'

import { RecipeFinder } from './components/RecipeFinder'
import { WelcomeScreen } from './pages/WelcomeScreen'
import { FormsScreen } from './pages/FormsScreen'

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      {/* <RecipeFinder /> */}
      <Stack.Screen name="Welcome" 
      component={WelcomeScreen}
       />

    <Stack.Screen name="Recipe" component={RecipeFinder} />

     <Stack.Screen name="Forms" component={FormsScreen} />

     

   
    </Stack.Navigator>
    </NavigationContainer>

  )

}