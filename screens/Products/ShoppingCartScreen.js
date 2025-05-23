import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { Colours } from '../../constants/Colours';
import { fetchHelper } from '../../helpers/fetchHelper';

export default function ShoppingCartScreen() {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from server on mount
  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.token) return;
      setLoading(true);
      try {
        const response = await fetchHelper('http://10.0.2.2:3000/cart', {
          method: 'GET',
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (response?.status === 'OK' && Array.isArray(response.items)) {
          setCartItems(response.items.map(item => ({
            ...item,
            quantity: item.count, // server uses 'count', UI uses 'quantity'
          })));
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  // Remove item from cart
  const removeItem = async (itemId) => {
    const updatedCart = cartItems.filter(i => i.id !== itemId);
    setCartItems(updatedCart);
    try {
      await fetchHelper('http://10.0.2.2:3000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: updatedCart.map(i => ({ id: i.id, price: i.price, count: i.quantity })),
        }),
      });
    } catch {}
  };

  // Empty the cart
  const emptyCart = async () => {
    setCartItems([]);
    try {
      await fetchHelper('http://10.0.2.2:3000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ items: [] }),
      });
    } catch {}
  };

  // Update quantity on server (remove if drops to 0)
  const updateQuantity = async (itemId, delta) => {
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    let updatedCart;
    if (newQuantity < 1) {
      updatedCart = cartItems.filter(i => i.id !== itemId);
    } else {
      updatedCart = cartItems.map(i =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );
    }
    setCartItems(updatedCart);
    try {
      await fetchHelper('http://10.0.2.2:3000/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: updatedCart.map(i => ({ id: i.id, price: i.price, count: i.quantity })),
        }),
      });
    } catch {}
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : cartItems.length === 0 ? (
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
                    onPress={() => updateQuantity(item.id, 1)}
                  />
                  <Button
                    title="-"
                    onPress={() => updateQuantity(item.id, -1)}
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