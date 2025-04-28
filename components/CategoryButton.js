import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { toTitleCase } from '../helpers/titleHelper';
import { Colours } from '../constants/Colours';

const CategoryButton = ({ category, onPress }) =>{
  return (
    <TouchableOpacity style={styles.categoryButton} onPress={onPress}>
      <Text style={styles.categoryText}>{toTitleCase(category)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    padding: 30,
    backgroundColor: Colours.primary,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
  },
});

export default CategoryButton;