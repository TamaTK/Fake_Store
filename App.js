import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={HomeScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}
        options={({route}) => ({title: route.params.category})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}