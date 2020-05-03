import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Text, TextBold, CartButton } from './design';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../actions';

function CartItem(props) {

  const item = props.cart[props.id];

  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderBottomColor: '#ddd', borderBottomWidth: 1}}>
      <View style={{flex: 0.2}}>
        <Image source={{uri: item.image}} style={{height: (Dimensions.get('window').width/5), width: (Dimensions.get('window').width/5)}}/>
      </View>
      <View style={{flex: 0.8, width: '100%'}}>
        <TextBold style={{fontSize: 18, marginTop: 5, paddingLeft:10, paddingRight: 10}}>{item.name}</TextBold>
        <View style={{flex: 1, flexDirection:'row', paddingLeft: 10, paddingRight: 10, marginTop:5, marginBottom: 5}}>
          <View style={{flex: 0.6}}>
            <Text style={{fontSize: 16, color: '#555', marginTop: 5}}>&#8377; {item.amount*item.quantity}</Text>
          </View>
          <View style={{flex: 0.4}}>
            <CartButton 
              small
              bordered
              quantity={item.quantity} 
              onAdd={() => props.addToCart({_id: item._id, name: item.name, amount: item.amount, image: item.image})} 
              onRemove={() => props.removeFromCart({_id: item._id, name: item.name, amount: item.amount, image: item.image})}
            />
          </View>
        </View>  
      </View>
    </View>
  )
}

function mapStateToProps(state, props) {
  return {cart: state.cart};
}

export default connect(null, { addToCart, removeFromCart })(CartItem);