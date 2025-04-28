import React, { useEffect, useState } from 'react';
import { fetchHelper } from '../helpers/fetchHelper';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import LoadingIndicator from '../components/LoadingIndicator';

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchHelper(`https://fakestoreapi.com/products/category/${category}`);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Something went wrong while fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductScreen', { product: item })}
          />
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
});
