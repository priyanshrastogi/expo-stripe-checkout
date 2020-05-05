import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

export default function Loader(props) {
  return (
    <ActivityIndicator size='large' color={Colors.primary}/>
  )
}