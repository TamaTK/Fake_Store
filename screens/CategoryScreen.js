import React, { useEffect, useState} from 'react';
import { fetchHelper } from '../fetchHelper';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

export default function CategoryScreen({ route, navigation }) {
    const { category } = route.params;
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const fetchedProducts = await fetchHelper(`https://fakestoreapi.com/products/category/${category}`);
            setProducts(fetchedProducts);
          } catch (error) {
            console.error("Error fetching products:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchProducts();
    }, [category]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Products in {category}:</Text>
          
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { product: item })}>
                <View style={styles.productCard}>
                    <View style={styles.productInfo}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.title}</Text>
                            <Text style={styles.productPrice}>${item.price}</Text>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    productCard: {
      padding: 10,
      backgroundColor: '#f8f8f8',
      marginBottom: 10,
      borderRadius: 10,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: 16,
      color: 'green',
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
