import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colours } from '../../constants/Colours';
import { fetchHelper } from '../../helpers/fetchHelper';
import { setCart, increaseQuantity, decreaseQuantity } from '../../stores/cartSlice';

export default function ShoppingCartScreen() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Fetch cart from server on mount and whenever cart changes
  const fetchCart = async () => {
    if (!user || !user.token) return;
    try {
      const response = await fetchHelper('http://10.0.2.2:3000/cart', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response?.status === 'OK' && Array.isArray(response.items)) {
        const items = response.items.map(item => ({ ...item, quantity: item.count }));
        dispatch(setCart(items));
      } else {
        dispatch(setCart([]));
      }
    } catch {
      dispatch(setCart([]));
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, [user]);

  // Optimistic UI: update Redux first, then sync to server
  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
    syncCartToServer();
  };
  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
    syncCartToServer();
  };
  const syncCartToServer = async () => {
    if (!user || !user.token) return;
    const items = cartItems.map(item => ({ id: item.id, price: item.price, count: item.quantity }));
    try {
      await fetchHelper('http://10.0.2.2:3000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ items }),
      });
    } catch {}
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your Shopping Cart is Empty!</Text>
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Total Items: {totalQuantity}</Text>
            <Text style={styles.summaryText}>Total Price: ${totalPrice.toFixed(2)}</Text>
          </View>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>Price: ${item.price * item.quantity}</Text>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="+"
                    onPress={() => handleIncrease(item.id)}
                  />
                  <Button
                    title="-"
                    onPress={() => handleDecrease(item.id)}
                  />
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.background,
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: Colours.error,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});