import React from 'react';
import { Feather } from '@expo/vector-icons';

export default function TabBarIcon(props) {
  return (
    <Feather
      style={{marginTop: 20}}
      name={props.name}
      size={22}
      color={props.focused ? 'white' : 'black'}
    />
  );
}