import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Home from '../Screens/User/Home';
import Account from '../Screens/User/Account';
import Offers from '../Screens/User/Offers';
import Leads from '../Screens/User/Leads';
import Chats from '../Screens/User/Chats';
// import MyJobs from '../Screens/MyJobs';
// import ShortList from '../Screens/ShortList';
// import Profile from '../Screens/Profile';

const iconPath = {
  m: require('../images/menuhome.png'),
  ma: require('../images/menuhomeactive.png'),
  h: require('../images/menuchat.png'),
  ha: require('../images/menuchatactive.png'),
  s: require('../images/menulead.png'),
  sa: require('../images/menuleadactive.png'),
  f: require('../images/Vector.png'),
  fa: require('../images/menuofferactive.png'),
  a: require('../images/menuaccount.png'),
  Aa: require('../images/menuaccountactive.png'),
};

const Tab = createBottomTabNavigator();
const TabIcon = source => <Image source={source} style={styles.tabIcon} />;

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Leads"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {
          paddingBottom: 2,
          // paddingTop: 2,
          fontSize: 10,
          fontFamily: 'Muli-Semibold',
          fontWeight: '600',
        },
        activeTintColor: '#1899FE',
        activeBackgroundColor: '#FFFFFF',
        inactiveBackgroundColor: '#FFFFFF',
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }
      }}>
        {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.ma : iconPath.m),
          headerShown: false,
        }}
      /> */}

      <Tab.Screen
        name="Leads"
        component={Leads}
        options={{
          tabBarLabel: 'Leads',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.sa : iconPath.s),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.ha : iconPath.h),
          headerShown: false,
        }}
      />


      <Tab.Screen
        name="Offers"
        component={Offers}
        options={{
          // tabBarBadge:3,
          tabBarLabel: 'Offers',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.fa : iconPath.f),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused}) =>
            TabIcon(focused ? iconPath.Aa : iconPath.a),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;

const styles = StyleSheet.create({
  tabIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  tabPlus: {
    height: 60,
    width: 60,
    marginTop: -30,
    resizeMode: 'contain',
  },
});
