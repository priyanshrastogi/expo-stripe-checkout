import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import InfoScreen from '../screens/InfoScreen';
import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';
import Colors from '../constants/Colors';
import CheckoutWebViewScreen from '../screens/CheckoutWebviewScreen';
import OrderPlacedScreen from '../screens/OrderPlacedScreen';

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
      <HomeStack.Screen 
        name="OrderPlaced" 
        component={OrderPlacedScreen} 
        options={{
          title: 'Your Order',
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
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Checkout" options={{headerLeft: null}} component={CheckoutWebViewScreen}/>
    </CartStack.Navigator>
  );
}

const AboutStack = createStackNavigator();

function AboutStackScreen() {
  return (
    <AboutStack.Navigator
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
      <AboutStack.Screen name="About" options={{headerLeft: null}} component={InfoScreen}/>
    </AboutStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function getTabBarVisible(route) {
  const routeName = route.state
    ?  route.state.routes[route.state.index].name
    : route.params?.screen || 'Cart';

  if (routeName === 'Checkout') {
    return false;
  }
  return true;
}

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
        options={({ route }) => ({
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='shopping-cart'/>,
          tabBarLabel: ({focused}) => <TabBarLabel focused={focused} title='Cart'/>,
          tabBarVisible: getTabBarVisible(route) 
        })}
      />
      <Tab.Screen 
        name="Info" 
        component={AboutStackScreen} 
        options={({ route }) => ({
          tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name='info'/>,
          tabBarLabel: ({focused}) => <TabBarLabel focused={focused} title='About'/>,
          tabBarVisible: getTabBarVisible(route) 
        })}
      />
    </Tab.Navigator>
  );
}