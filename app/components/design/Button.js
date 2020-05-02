import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../constants/Colors';
import { LatoTextBold as TextBold } from './Text';

export default function CustomButton(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[props.style, {borderColor: 'transparent', height: props.small ? 30 : 50, width: '100%', backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center'}]}>
      <TextBold style={{color: 'white', fontSize: 16}}>{props.title}</TextBold>
      </View>
    </TouchableWithoutFeedback>
  )
}