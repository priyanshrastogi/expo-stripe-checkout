import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../constants/Colors';
import { LatoTextBold as TextBold } from './Text';

export default function CustomButton(props) {

  return (
    <View style={{flex: 1, flexDirection: 'row', width:'100%'}}>
      <TouchableWithoutFeedback onPress={props.onRemove}>
        <View style={{borderColor: 'transparent', height: props.small ? 30 : 50, backgroundColor: Colors.primary, flex: 0.35, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: props.allBorder ? 10 : 0, borderBottomLeftRadius: 10}}>
        <TextBold style={{color: 'white', fontSize: 16}}>-</TextBold>
        </View>
      </TouchableWithoutFeedback>
      <View style={{borderColor: 'transparent', height: props.small ? 30 : 50, backgroundColor: '#fff', flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
        <TextBold style={{fontSize: 16}}>{props.quantity}</TextBold>
      </View>
      <TouchableWithoutFeedback onPress={props.onAdd}>
        <View style={{borderColor: 'transparent', height: props.small ? 30 : 50, backgroundColor: Colors.primary, flex: 0.35, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: props.allBorder ? 10 : 0, borderBottomRightRadius: 10}}>
        <TextBold style={{color: 'white', fontSize: 16}}>+</TextBold>
        </View>
      </TouchableWithoutFeedback>    
    </View>
  )
}