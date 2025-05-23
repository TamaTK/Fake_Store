import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import { toTitleCase } from './helpers/titleHelper';
import { StyleSheet, View, Text, Alert } from 'react-native';

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

function UserProfileTab({ isSignUp, setIsSignUp, setIsAuthenticated }) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileCard}>
        {isSignUp ? (
          <>
            <Text style={styles.profileTitle}>Sign up a new user</Text>
            {/* Add TextInputs here */}
            <View style={styles.buttonRow}>
              <Text onPress={() => setIsSignUp(false)} style={styles.linkText}>
                Already have an account? <Text style={styles.linkAction}>Sign In</Text>
              </Text>
              <Text
                onPress={() => { setIsAuthenticated(true); }}
                style={[styles.linkText, styles.signUpButton]}
              >
                Sign Up
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.profileTitle}>Sign in with your email and password</Text>
            {/* Add TextInputs here */}
            <View style={styles.buttonRow}>
              <Text onPress={() => setIsSignUp(true)} style={styles.linkText}>
                Don't have an account? <Text style={styles.linkAction}>Sign Up</Text>
              </Text>
              <Text
                onPress={() => { setIsAuthenticated(true); }}
                style={[styles.linkText, styles.signInButton]}
              >
                Sign In
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default function App() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Products"
          component={ProductsStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                Alert.alert('Login Required', 'Please sign in to access this tab.');
                navigation.navigate('User Profile');
              }
            },
          })}
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
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                Alert.alert('Login Required', 'Please sign in to access this tab.');
                navigation.navigate('User Profile');
              }
            },
          })}
        />
        <Tab.Screen
          name="User Profile"
          children={() => (
            <UserProfileTab
              isSignUp={isSignUp}
              setIsSignUp={setIsSignUp}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    gap: 16,
  },
  linkText: {
    color: '#007bff',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  linkAction: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  signInButton: {
    color: '#28a745',
    fontWeight: 'bold',
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  signUpButton: {
    color: '#28a745',
    fontWeight: 'bold',
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
});