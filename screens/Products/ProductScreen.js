import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductDetail from '../../components/ProductDetail';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Colours } from '../../constants/Colours';

export default function ProductScreen({ route, navigation }) {
    const [loading, setLoading] = useState(true);
    const { product } = route.params;

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ProductDetail product={product} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colours.secondary,
    padding: 20,
    paddingBottom: 50,
  },
});