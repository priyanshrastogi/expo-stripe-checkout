import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { TextBold, Text } from '../components/design';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function InfoScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Pizza By Express is an imaginary Pizza Ordering App created by&nbsp;
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color: Colors.primary}}>Priyansh Rastogi </Text>
        </TouchableOpacity> 
        to demonstrate Stripe Checkout integration with Universal Apps (works on Android, iOS, Web, Desktop) built with Expo.
      </Text>
      <Text style={{marginTop: 10}}>Code for this project is open-source and feel free to make modifications and submit PRs for improvements. 
        Code is available on&nbsp;
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color: Colors.primary}}>priyanshrastogi/expo-stripe-checkout</Text>
        </TouchableOpacity>
        .
      </Text>
      <Text style={{marginTop: 10}}>I have published a comprehensive guide on integrating Stripe with React Native and Expo based apps.
        It is available on&nbsp;
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color: Colors.primary}}>this blog post</Text>
        </TouchableOpacity>
        . Tools and Frameworks are used to build this apps are React Native, Expo, Node.js, MongoDB, and Stripe SDK. This project is 
        hosted on Netlify.
      </Text>
      <Text style={{marginTop: 10}}>Images of these Pizzas are sourced from&nbsp;
        <TouchableOpacity onPress={() => {}}>
          <Text style={{color: Colors.primary}}>Unsplash</Text>
        </TouchableOpacity>
        .
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
});