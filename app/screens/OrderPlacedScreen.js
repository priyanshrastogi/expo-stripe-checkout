import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, TextBold, Alert, Loader } from '../components/design';
import axios from 'axios';
import URLs from '../constants/URLs';

export default function OrderPlacedScreen(props) {
  
  const [order, setOrder] = useState({_id: props.route.params.orderId});

  useEffect(() => {
    async function getOrderDetails() {
      const order = await axios.get(`${URLs.BASE_API}/.netlify/functions/api/orders/${props.route.params.orderId}`);
      setOrder(order.data);
    };
    getOrderDetails(); 
  }, []);
  
  console.log(order);

  if(Object.keys(order).length <2) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Loader />
      </View>
    )
  }

  else {
    return (
      <View style={styles.container}>
        {order.paymentStatus === 'paid' ?
        <View style={{padding: 20}}>
          <Alert message='Transaction Successful!' type='success'/>
          <TextBold style={{marginTop: 30, fontSize: 16, textAlign: 'center'}}>Order Placed</TextBold>
          <Text style={{marginTop: 5, fontSize: 14, textAlign: 'center'}}>Order ID: {order._id}</Text>
          <TextBold style={{marginTop: 20, marginBottom: 20}}>Order Summary</TextBold>
          <View elevation={5} style={{backgroundColor: '#fff', shadowColor: '#000000', shadowOffset: { width: 2, height: 5}, shadowRadius: 5, shadowOpacity: 0.5, borderRadius: 5, padding: 10}}>
            <FlatList
              data={order.items}
              keyExtractor={item => item._id}
              renderItem={({item}) => {
                return (
                  <View key={item.name} style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 5, paddingBottom: 5}}>
                    <View style={{flex: 0.7}}>
                      <TextBold>{item.name}</TextBold>
                      <Text>Quantity: {item.quantity}</Text>
                    </View>
                    <View style={{flex: 0.3}}>
                      <TextBold style={{textAlign: 'right'}}>&#8377; {item.amount*item.quantity}</TextBold>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, marginRight: 10, paddingTop: 20, paddingBottom: 20}}>
            <TextBold>Total Paid</TextBold>
            <TextBold>&#8377; {order.amount}</TextBold>
          </View>
        </View>
        :
        <View style={{padding: 20}}>
          <Alert message='Transaction Failed!' type='danger'/>
          <TextBold style={{marginTop: 30, fontSize: 16, textAlign: 'center'}}>We could not verify the transaction.</TextBold>
          <Text style={{marginTop: 5, fontSize: 14, textAlign: 'center'}}>In case, You have been charged, you will receive the refund within a week.</Text>
        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  }
})