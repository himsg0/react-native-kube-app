/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Landing = props => {
  const tasks = useSelector(state => state.AuthUserR.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (tasks?.data != undefined) {
      setIsLoggedIn(true);
    }
  }, [tasks]);

  // const NavLogin = () => {
  //   !isLoggedIn
  //     ? props.navigation.replace('Login')
  //     : props.navigation.replace('City');
  // };

  // setTimeout(NavLogin, 1000);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('./KubeLogo.png')}
          style={{height: 70, width: 170, marginTop: 190}}
        />
      </View>
      <ImageBackground
        style={{flex: 0.5, alignItems: 'center'}}
        source={require('./ad.png')}>
        <Image
          style={{height: 35, width: 311}}
          source={require('./YourCityPartner.png')}
        />
      </ImageBackground>
      {}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Landing;
