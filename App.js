import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchHelper } from "./fetchHelper.js";

export default function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCategories = await fetchHelper("https://fakestoreapi.com/products/categories");
        setCategories(fetchedCategories);
        console.log("Categories:", fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
