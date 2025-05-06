import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import { toTitleCase } from './helpers/titleHelper';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductsStack() {
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Shopping Cart" component={ShoppingCartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}