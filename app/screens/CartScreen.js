import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

function CartScreen(props) {
  
  const handleCheckout = async () => { 
    const res = await axios.post('http://192.168.1.5:3000/.netlify/functions/api/checkout', {
      items: Object.values(props.cart)
    });
    props.navigation.navigate('Checkout', {sessionId: res.data.sessionId});
  }
  
  console.log(props.cart);

  return (
    <View style={styles.container}>
      <Text>Cart Screen</Text>
      <Button onPress={handleCheckout} title='Checkout'></Button>
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

function mapStateToProps(state) {
  return {cart: state.cart};
}

export default connect(mapStateToProps)(CartScreen);