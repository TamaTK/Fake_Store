// screens/ProductScreen.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductDetail from '../components/ProductDetail';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductDetail product={product} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 50,
  },
});
