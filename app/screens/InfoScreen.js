import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Text } from '../components/design';
import Colors from '../constants/Colors';

export default function InfoScreen(props) {
  
  const openWebBrowser = async (link) => {
    await WebBrowser.openBrowserAsync(link, {
      toolbarColor: Colors.primary
    });
  }

  return (
    <View style={styles.container}>
      <Text>Pizza By Express is an imaginary Pizza Ordering App created by&nbsp;
        {<Text style={{color: Colors.primary}} onPress={() => openWebBrowser('https://priyanshrastogi.com')}>
          Priyansh Rastogi&nbsp;
        </Text>}
        to demonstrate Stripe Checkout integration with Universal Apps (works on Android, iOS, Web, Desktop) built with Expo.
      </Text>
      <Text style={{marginTop: 10}}>Code for this project is open-source and feel free to make modifications and submit PRs for improvements. 
        Code is available on&nbsp;
        <Text style={{color: Colors.primary}} onPress={() => openWebBrowser('https://github.com/priyanshrastogi/expo-stripe-checkout')}>
          priyanshrastogi/expo-stripe-checkout
        </Text>
        .
      </Text>
      <Text style={{marginTop: 10}}>I have published a comprehensive guide on integrating Stripe Checkout with React Native and Expo based apps,
      which is a pure JavaScript based approach, so you don't need to write any native code (Java for Android, Swift for iOS).
        It is available on&nbsp;
        <Text style={{color: Colors.primary}} onPress={() => openWebBrowser('https://blog.priyanshrastogi.com')}>
          this blog post
        </Text>
        .
      </Text>
      <Text style={{marginTop: 10}}>
        Tools and Frameworks that were used to build this app are React Native, Expo, Node.js, Express, MongoDB, Stripe SDK, 
        and AWS Serverless Express. Web Client (PWA) of this app is hosted on Netlify and backend REST API is hosted as a Lambda Function on 
        Netlify Functions. Native Mobile Builds can be accessed using Expo Client.
      </Text>
      <Text style={{marginTop: 10}}>Images of these Pizzas are sourced from&nbsp;
        <Text style={{color: Colors.primary}} onPress={() => openWebBrowser('https://unsplash.com/s/photos/pizza')}>
          Unsplash
        </Text>
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