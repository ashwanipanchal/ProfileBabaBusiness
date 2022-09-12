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
  h: require('../images/menuchat.png'),
  ha: require('../images/menuchatactive.png'),
  s: require('../images/menulead.png'),
  sa: require('../images/menuleadactive.png'),
  f: require('../images/menuoffer.png'),
  fa: require('../images/menuofferactive.png'),
  a: require('../images/menuaccount.png'),
  Aa: require('../images/menuaccountactive.png'),
};

const Tab = createBottomTabNavigator();
const TabIcon = source => <Image source={source} style={styles.tabIcon} />;

const TabNavigatorTest = () => {
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
      }}>

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

    </Tab.Navigator>
  );
};
export default TabNavigatorTest;

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
