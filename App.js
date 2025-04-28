import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductScreen from './screens/ProductScreen';
import { toTitleCase } from './helpers/titleHelper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={HomeScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}
        options={({route}) => ({title: toTitleCase(route.params.category)})} />
        <Stack.Screen name="ProductScreen" component={ProductScreen}
        options={({route}) => ({title: "Product Details"})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}