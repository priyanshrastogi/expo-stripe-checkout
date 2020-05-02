import React from 'react';
import { Text } from 'react-native';

export function LatoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'lato', fontWeight: '200' }]} />
  );
};

export function LatoTextBold(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'lato-bold', fontWeight: '400' }]} />
  );
}