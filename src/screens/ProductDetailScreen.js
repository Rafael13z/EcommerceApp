import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = route.params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.image} 
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.brand}>Marca: {product.brand}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        {product.discountPercentage > 0 && (
          <Text style={styles.discount}>
            {product.discountPercentage}% OFF
          </Text>
        )}
      </View>
      <Text style={styles.stock}>Estoque: {product.stock}</Text>
      <Text style={styles.rating}>Avaliação: {product.rating}/5</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  discount: {
    fontSize: 16,
    color: 'green',
  },
  stock: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
  },
});

export default ProductDetailScreen;