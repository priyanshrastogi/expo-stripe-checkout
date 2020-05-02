import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';
import Colors from '../constants/Colors';
import CheckoutWebViewScreen from '../screens/CheckoutWebviewScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Pizza by Express',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'lato-bold'
          },
          headerTitleAlign: 'center'
        }}
      />
      <HomeStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </HomeStack.Navigator>
  );
}

const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'lato-bold'
        },
        headerTitleAlign: 'center'
      }} 
    >
      <CartStack.Screen name="Cart" tit component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutWebViewScreen}/>
    </CartStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{activeBackgroundColor: Colors.primary,  style: {height: 60}, keyboardHidesTabBar: true}}>
      <Tab.Screen 
        name="Home"
        component={HomeStackScreen} 
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='home'/>, 
          tabBarLabel: ({focused}) => <TabBarLabel focused={focused} title='Home'/>
        }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStackScreen} 
        options={{
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='shopping-cart'/>,
          tabBarLabel: ({focused}) => <TabBarLabel focused={focused} title='Cart'/>,
        }}
      />
    </Tab.Navigator>
  );
}