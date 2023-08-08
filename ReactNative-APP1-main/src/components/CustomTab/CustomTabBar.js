import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants';

const CustomTabBar = props => {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    right: 0,
    left: 0,
    // bottom: 15,
    height: 27,

    backgroundColor: COLORS.white,
    borderRadius: 0,
    // shadowColor: COLORS.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    // elevation: 3,
  },
});
