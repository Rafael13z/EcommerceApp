import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.discount}>{product.discountPercentage}% OFF</Text>
          )}
        </View>
        <Text style={styles.rating}>⭐ {product.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: 'green',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;