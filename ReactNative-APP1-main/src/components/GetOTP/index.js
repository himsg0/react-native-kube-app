import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import Text from '../../components/MyText'
import styles from './Style';

const CustomButton = ({
  onPress,
  label = '',
  loading = false,
  btnStyle,
  txtStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.buttonStyle, btnStyle]}>
      {!loading ? (
        <Text style={[styles.textStyle, txtStyle]}>{label}</Text>
      ) : (
        <ActivityIndicator color={'#000'} size={'small'} />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
