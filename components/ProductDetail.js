import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../stores/cartSlice';
import { Colours } from '../constants/Colours';
import { fetchHelper } from '../helpers/fetchHelper';

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user); // get user/token from Redux

  const handleAddToCart = async () => {
    if (!user || !user.token) {
      alert('You must be signed in to add to cart.');
      return;
    }
    dispatch(addItemToCart(product));
    // Sync Redux cart to server in background
    const state = store.getState();
    const items = state.cart.items.map(item => ({ id: item.id, price: item.price, count: item.quantity }));
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
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <View style={styles.separator} />
      <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Add to Cart" 
          onPress={handleAddToCart}  
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colours.secondary,
    padding: 20,
    paddingBottom: 50,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ProductDetail;