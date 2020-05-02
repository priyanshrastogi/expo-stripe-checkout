import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductDetailsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Product Details Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});