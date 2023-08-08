import React from 'react';
import {StyleSheet} from 'react-native';

const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  firstIconStyle: {
    transform: [{rotateX: '180deg'}, {rotateY: '180deg'}, {scaleY: -1}],
    height: 20,
    width: 20,
  },
  inputIcon: {
    height: 20,
    width: 1,
    marginHorizontal: 10,
    marginLeft: 10,
  },
};

export default styles;
