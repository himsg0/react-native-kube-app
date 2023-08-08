/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image} from 'react-native';
import {COLORS} from '../constants';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabBarButton from '../components/CustomTab/CustomTabBarButton';
import CustomTabBar from '../components/CustomTab/CustomTabBar';
import {useNavigation} from '@react-navigation/native';
import AddCoin from '../screen/Coin/AddCoin';
import Categories from '../screen/Categories/Categories';
import StoreList from '../screen/StoreList/StoreList';
import Home from '../screen/Home';
import Profile from '../screen/Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation, route}) => {
  
  // const cat = route.params.categories;
  // console.log("5555",cat);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: COLORS.grey,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarButton: props => (
            <CustomTabBarButton
              route="Home"
              label="Home"
              image={require('../assets/images/Lhome.png')}
              {...props}
            />
          ),
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <>
                <Image source={require('../assets/images/Lhome.png')} />
              </>
            ) : (
              <>
                <Image source={require('../assets/images/Lhome.png')} />
              </>
            ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
          tabBarButton: props => (
            <CustomTabBarButton
              label="Categories"
              image={require('../assets/images/icon.png')}
              {...props}
            />
          ),
          tabBarIcon: ({size}) => (
            <Image
              style={{height: size, Width: size}}
              source={require('../assets/images/categories.png')}
            />
          ),
        }}
      />
      <Tab.Screen

        name="StoreList"

        component={StoreList}
        options={{
          tabBarLabel: 'Search',
          tabBarButton: props => (
            <CustomTabBarButton
              label="Search"
              image={require('../assets/images/search.png')}
              {...props}
            />
          ),
          tabBarIcon: ({size}) => (
            <Image
              style={{height: size, Width: size}}
              source={require('../assets/images/search.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'MyCoins'}
        component={AddCoin}
        options={{
          tabBarLabel: 'MyCoins',

          tabBarButton: props => (
            <CustomTabBarButton
              route="MyCoins"
              image={require('../assets/images/coin.png')}
              label="MyCoins"
              {...props}
            />
          ),
          tabBarIcon: ({size}) => (
            <Image
              style={{height: size, Width: size}}
              source={require('../assets/images/coin.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarButton: props => (
            <CustomTabBarButton
              route="Profile"
              image={require('./bnprof.png')}
              label="Profile"
              {...props}
            />
          ),
          tabBarIcon: ({size}) => (
            <Image
              style={{height: size, Width: size}}
              source={require('./bnprof.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    // bottom: 15,
    right: -10,
    left: -10,
    height: 58,
  },
});
