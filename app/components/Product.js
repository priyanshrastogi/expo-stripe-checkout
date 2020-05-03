import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, Platform } from 'react-native';
import { Text, TextBold, Button, CartButton } from './design';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';

function Product(props) {

  const { product } = props;
  const { cart } = props;

  return (
    <View elevation={5} style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000000', shadowOffset: { width: 2, height: 5}, shadowRadius: 5, shadowOpacity: 0.5, borderRadius: 5}}>
      <Image source={{uri: product.image}} style={{height: (Dimensions.get('window').width/2)-30, width: (Dimensions.get('window').width/2)-30, borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>
      <View style={{flex: 1, width: '100%'}}>
        <TextBold style={{fontSize: 18, marginTop: 5, textAlign: 'center'}}>{product.name}</TextBold>
        <View style={{flex: 1, justifyContent: 'space-between', flexDirection:'row', paddingLeft: 10, paddingRight: 10, marginTop:5, marginBottom: 5}}>
          <Text style={{fontSize: 16, color: '#555'}}>&#8377; {product.amount}</Text>
          <Text style={{fontSize: 16, color: '#555'}}>12 Inch</Text>
        </View>  
      </View>
      {cart[product._id] ? 
      <CartButton 
        containerStyle={{marginTop: Platform.OS === 'web' ? 10: 0, marginBottom: Platform.OS === 'web' ? -15: 0}}
        small
        quantity={cart[product._id].quantity} 
        onAdd={() => props.addToCart({_id: product._id, name: product.name, amount: product.amount, image: product.image})} 
        onRemove={() => props.removeFromCart({_id: product._id, name: product.name, amount: product.amount, image: product.image})}
      />
      :
      <Button 
        small
        title='Add to Cart' 
        style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}} 
        onPress={() => props.addToCart({_id: product._id, name: product.name, amount: product.amount, image: product.image})}
      />
      }
    </View>
  )
}

function mapStateToProps(state, props) {
  return {cart: state.cart};
}

export default connect(mapStateToProps, { addToCart, removeFromCart })(Product);