import React from 'react';
import { WebView } from 'react-native-webview';
import { ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { CommonActions, StackActions } from '@react-navigation/native';
import { clearCart } from '../actions';

function CheckoutWebViewScreen(props) {

  handleChange = (e) => {
    console.log(e.url);
    if(!e.loading && e.url==='https://pizzabyexpress.netlify.app/.netlify/functions/api/payment/success') {
      props.clearCart();
      props.navigation.dispatch(StackActions.popToTop());
      props.navigation.dispatch(CommonActions.navigate('OrderPlaced'));
    }
    else if(!e.loading && e.url==='https://pizzabyexpress.netlify.app/.netlify/functions/api/payment/cancel') {
      props.navigation.goBack();
      ToastAndroid.show('Payment Cancelled.', ToastAndroid.SHORT);
    }
  }
  
  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: `https://pizzabyexpress.netlify.app/.netlify/functions/api/web/checkout/redirect?sessionId=${props.route.params.sessionId}`}}
      onNavigationStateChange={this.handleChange}
      ref={(ref) => { webview = ref; }}
    />
  )
}

export default connect(null, { clearCart })(CheckoutWebViewScreen);