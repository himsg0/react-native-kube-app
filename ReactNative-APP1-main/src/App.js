import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/AppStack';
import Landing from './screen/Landing/Landing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthUserA} from './redux/Action/GetAuthA';
import {
  requestUserPermission,
  notificationListener,
} from './Utils/notificationService';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.AuthUserR.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alreadyLogged, setAlreadyLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSplash, setIsSplash] = useState(true);
  const [isCity, setIsCity] = useState(null);

  // console.log(tasks);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getCData = () => {
    AsyncStorage.getItem('Cdata').then(val => {
      setIsCity(val);
      console.log(val, 'hdvhm');
    });
  };

  useEffect(() => {
    getCData();
  });

  useEffect(() => {
    getData().then(res => {
      if (res != null) {
        dispatch(AuthUserA(res));
      }
    });
  }, []);

  useEffect(() => {
    if (tasks?.data !== undefined && tasks?.data !== null) {
      setIsLoggedIn(true);
    } else if (tasks?.data == null) {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [tasks]);

  useEffect(() => {
    var changeStatus = setTimeout(() => {
      setIsSplash(false);
    }, 2000);

    return () => {
      clearTimeout(changeStatus);
    };
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  });

  // console.log(isSplash, 'jdfjg');

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#FFBE69'} barStyle="dark-content" />

      {/* <Landing /> */}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <ActivityIndicator size={'large'} color="#fff" />
        </View>
      ) : isSplash ? (
        <Landing />
      ) : !isLoggedIn ? (
        <AuthStack  />
      ) : (
        <AppStack isCity={isCity} />
      )}
    </View>
  );
};

export default App;
