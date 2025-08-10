import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import axios from 'axios';

const CategoryProducts = ({ categories, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].category);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyjson.com/products/category/${selectedCategory}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const renderItem = ({ item }) => (
    <ProductCard 
      product={item} 
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.category}
            style={[
              styles.tabButton,
              selectedCategory === cat.category && styles.activeTab,
            ]}
            onPress={() => setSelectedCategory(cat.category)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat.category && styles.activeText,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <Text style={styles.loading}>Carregando produtos...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#6200ee',
  },
  tabText: {
    color: '#333',
  },
  activeText: {
    color: 'white',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    padding: 10,
  },
});

export default CategoryProducts;