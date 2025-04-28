import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Colours } from '../constants/Colours';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.productCard}>
        <View style={styles.productInfo}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    padding: 10,
    backgroundColor: Colours.primary,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: Colours.success,
    marginBottom: 5,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    marginLeft: 10,
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
  },
});

export default ProductCard;
