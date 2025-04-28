import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function CategoryScreen({ route }) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Showing products for: {category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
