import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function ProductScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>


      <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>


      <Button title="Add to Cart" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({

});
