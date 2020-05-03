import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, Platform } from 'react-native';
import { Button, Text } from '../components/design';
import axios from 'axios';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import CartItem from '../components/CartItem';

function CartScreen(props) {
  
  const handleCheckout = async () => { 
    const res = await axios.post('https://pizzabyexpress.netlify.app/.netlify/functions/api/checkout', {
      items: Object.values(props.cart)
    });
    if(Platform.OS === 'web') {
      console.log(res.data.sessionId);
      let result = await WebBrowser.openBrowserAsync(`https://pizzabyexpress.netlify.app/.netlify/functions/api/web/checkout/redirect?sessionId=${res.data.sessionId}`);
      console.log(result);
    }
    else 
      props.navigation.navigate('Checkout', {sessionId: res.data.sessionId});
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Your Cart is Empty</Text>
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
        <Button onPress={handleCheckout} title={`Checkout and Pay ${totalPayable()}`} style={{borderRadius: 5}}></Button>
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

export default connect(mapStateToProps)(CartScreen);