import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Products/HomeScreen';
import CategoryScreen from '../screens/Products/CategoryScreen';
import ProductScreen from '../screens/Products/ProductScreen';
import { toTitleCase } from '../helpers/titleHelper';

const Stack = createNativeStackNavigator();

export default function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={HomeScreen} />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={({ route }) => ({ title: toTitleCase(route.params.category) })}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}