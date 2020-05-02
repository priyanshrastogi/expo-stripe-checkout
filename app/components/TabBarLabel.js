import React from 'react';
import { Text } from 'react-native';

export default function TabBarLabel(props) {
  return (
    <Text style={{flex: 1, textAlign: 'center', marginTop: 15, color: props.focused ? 'white': 'black', fontFamily: 'lato'}}>
      {props.title}
    </Text>
  );
}