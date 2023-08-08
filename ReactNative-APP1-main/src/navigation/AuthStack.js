/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OtpScreen from '../screen/OTP/OtpScreen';
import Login from '../screen/Login/Login';
import Registration from '../screen/Registration/Registration';
import Landing from '../screen/Landing/Landing';
import Logout from '../screen/Logout/Logout';
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;
