import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import ContactUs from '../screen/ContactUs/ContactUs';
import BecomePartner from '../screen/BecomeAPartner/BecomePartner';
import AboutUs from '../screen/AboutUs/AboutUs';
import Advertise from '../screen/Advertise/Advertise';
import VendorPage from '../screen/VendorPage/VendorPage';
import Home from '../screen/Home';
import FavoriteVendor from '../screen/FavoriteVendor/FavoriteVendor';
import Search from '../screen/Search.js';
import BlogList from '../screen/BlogList/BlogList';
import BlogPage from '../screen/BlogList/BlogPage';
import City from '../screen/CityLocality/CityLocality';
import AddCoin from '../screen/Coin/AddCoin';
import Transaction from '../screen/Coin/Transaction';
import Paying from '../screen/Coin/Paying';
import PayOption from '../screen/Coin/PayOption';
import Landing from '../screen/Landing/Landing';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EdProfile from '../screen/EditProfile/EdProfile';

const Stack = createStackNavigator();

function AppStack({isCity}) {
  // const [isCity, setIsCity] = useState(null);

  // const getCData = () => {
  //   AsyncStorage.getItem('Cdata').then(val => {
  //     setIsCity(val);
  //     console.log(val, 'hdvhm');
  //   });
  // };

  // useEffect(() => {
  //   getCData();
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Init'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="City" component={City} />
        <Stack.Screen
          name="Init"
          component={isCity !== null ? BottomTabNavigator : City}
        />

        <Stack.Screen name="EdProfile" component={EdProfile} />

        <Stack.Screen name="AddCoin" component={AddCoin} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="BTNav" component={BottomTabNavigator} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="BlogList" component={BlogList} />

        <Stack.Screen name="BlogPage" component={BlogPage} />
        <Stack.Screen name="BecomePartner" component={BecomePartner} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Advertise" component={Advertise} />
        <Stack.Screen name="VendorPage" component={VendorPage} />
        <Stack.Screen name="FavoriteVendor" component={FavoriteVendor} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Paying" component={Paying} />
        <Stack.Screen name="PayOption" component={PayOption} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
