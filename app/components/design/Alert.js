import React from 'react';
import { View } from 'react-native';
import { LatoTextBold as TextBold } from './Text';

export default function Alert(props) {
  
  const colorMap = {
    success: '#1D976C',
    danger: '#cb2d3e'
  }
  
  return (
    <View style={{backgroundColor: colorMap[props.type], padding: 20, borderRadius: 5}}>
      <TextBold style={{textAlign: 'center', fontSize: 16, color: 'white'}}>{props.message}</TextBold>
    </View>
  )
}