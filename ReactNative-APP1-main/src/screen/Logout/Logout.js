/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  // Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Text from '../../components/MyText'
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthUserA} from '../../redux/Action/GetAuthA';
import {useDispatch, useSelector} from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(AuthUserA(null));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },

      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.removeItem('userData');
          AsyncStorage.removeItem('Cdata');
          AsyncStorage.removeItem('Ldata');
          console.log('Done');
          setIsLoggedIn(true);
        },
      },
    ]);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}>
        <View
          style={{
            backgroundColor: '#3F3F3F',
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            width: 99,
            height: 119,
          }}>
          <Image
            style={{width: 41, height: 41}}
            source={require('../Profile/ProfileAssets/logout.png')}
          />
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
