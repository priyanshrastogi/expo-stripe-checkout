import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Platform } from 'react-native';
import { Button, Text } from '../components/design';
import axios from 'axios';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { CommonActions } from '@react-navigation/native';
import CartItem from '../components/CartItem';
import { clearCart } from '../actions';
import URLs from '../constants/URLs';

function CartScreen(props) {
  
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => { 
    setLoading(true);
    const res = await axios.post(`${URLs.BASE_API}/.netlify/functions/api/checkout`, {
      items: Object.values(props.cart),
      platform: Platform.OS
    });
    setLoading(false);
    if(Platform.OS === 'web') {
      let result = await WebBrowser.openAuthSessionAsync(`${URLs.BASE_API}/.netlify/functions/api/web/checkout/redirect?sessionId=${res.data.sessionId}`);
      if(result.type === 'dismiss') {
        props.clearCart();
        props.navigation.dispatch(CommonActions.navigate('OrderPlaced', {orderId: res.data.orderId}));
      }
    }
    else 
      props.navigation.navigate('Checkout', {sessionId: res.data.sessionId, orderId: res.data.orderId});
  }

  const totalPayable = () => {
    let total = 0;
    const items = Object.values(props.cart);
    for(let i=0; i<items.length; i++) {
      total = total + items[i].amount*items[i].quantity;
    }
    return '\u20B9 ' + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  if(Object.keys(props.cart).length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
  <Text style={{fontSize: 16}}>Your Cart is Empty.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={Object.values(props.cart)}
        renderItem={({item}) => <CartItem cart={props.cart} id={item._id} />} 
        keyExtractor={item => item._id}
        scrollEnabled={false}
      />
      <View style={{margin: 20, marginTop: 50}}>
        <Button onPress={handleCheckout} title={`Checkout and Pay ${totalPayable()}`} style={{borderRadius: 5}} loading={loading} loadingTitle='Redirecting You to Checkout...'></Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

function mapStateToProps(state) {
  return {cart: state.cart};
}

export default connect(mapStateToProps, { clearCart })(CartScreen);