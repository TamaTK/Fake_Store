import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsStack from './ProductsStack';
import ShoppingCartScreen from '../screens/Products/ShoppingCartScreen';
import UserProfileScreen from '../screens/Auth/UserProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { View, Text, Alert, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const [isSignUp, setIsSignUp] = useState(false);

  // Handler to block navigation if not authenticated
  const blockIfNotAuth = (navigation) => ({
    tabPress: (e) => {
      if (!isAuthenticated) {
        e.preventDefault();
        Alert.alert('Login Required', 'Please sign in to access this tab.');
        navigation.navigate('User Profile');
      }
    },
  });

  return (
    <Tab.Navigator initialRouteName="User Profile">
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
        listeners={({ navigation }) => blockIfNotAuth(navigation)}
      />
      <Tab.Screen
        name="Shopping Cart"
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Icon name="cart-outline" color={color} size={size} />
              {totalQuantity > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
              )}
            </View>
          ),
        }}
        listeners={({ navigation }) => blockIfNotAuth(navigation)}
      />
      <Tab.Screen
        name="User Profile"
        children={() => (
          <UserProfileScreen
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});