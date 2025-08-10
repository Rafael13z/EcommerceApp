import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryProducts from '../components/CategoryTabs';

const Tab = createBottomTabNavigator();

const maleCategories = [
  { name: 'Camisas', category: 'mens-shirts' },
  { name: 'Calçados', category: 'mens-shoes' },
  { name: 'Relógios', category: 'mens-watches' },
];

const femaleCategories = [
  { name: 'Bolsas', category: 'womens-bags' },
  { name: 'Vestidos', category: 'womens-dresses' },
  { name: 'Jóias', category: 'womens-jewellery' },
  { name: 'Calçados', category: 'womens-shoes' },
  { name: 'Relógios', category: 'womens-watches' },
];

const ProductListScreen = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Masculino">
        {() => <CategoryProducts categories={maleCategories} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Feminino">
        {() => <CategoryProducts categories={femaleCategories} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ProductListScreen;