import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store/store';
import { logout } from './src/store/authSlice';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { Button, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen} 
            options={({ navigation }) => ({
              title: 'Produtos',
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <Button
                    title="Perfil"
                    onPress={() => navigation.navigate('Profile')}
                    color="#6200ee"
                  />
                  <View style={{ width: 10 }} />
                  <Button 
                    title="Sair" 
                    onPress={() => {
                      store.dispatch(logout());
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    }}
                    color="red"
                  />
                </View>
              ),
            })}
          />
          
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{ title: 'Detalhes do Produto' }}
          />
          
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Meu Perfil',
              headerBackTitle: 'Voltar'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;