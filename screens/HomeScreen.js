import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchHelper } from '../helpers/fetchHelper'; // Correct path
import { toTitleCase } from '../helpers/titleHelper';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCategories = await fetchHelper("https://fakestoreapi.com/products/categories");
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate('CategoryScreen', { category: item })}
          >
            <Text style={styles.categoryText}>{toTitleCase(item)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
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
  categoryButton: {
    padding: 30,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
  },
});
