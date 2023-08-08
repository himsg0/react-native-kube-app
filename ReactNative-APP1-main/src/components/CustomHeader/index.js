import React from 'react';


import {View} from 'react-native';
import Text from '../../components/MyText'

export default function CustomHeader(props) {
  return (
    <View
      style={[
        {
          backgroundColor: '#f1f1f1',
          padding: 15,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        },
        props.style,
      ]}>
      <Text style={{color: '#26235C', fontSize: 20, fontWeight: 'bold'}}>
        {props.label}
      </Text>
    </View>
  );
}
