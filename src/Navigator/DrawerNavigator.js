import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Screens/User/CustomDrawer';
import Home from '../Screens/User/Home'
import Notification from '../Screens/User/Notification';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();
const DrawerNavigator = ({route}) => (
  // console.log("====== DrawerNAvigation Page route ",route)
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home"
    drawerStyle={{width: '70%'}}
    drawerContent={props => <CustomDrawer {...props} />}
    >
    <Drawer.Screen name="TabNavigator" component={TabNavigator}/>
  </Drawer.Navigator>
);
export default DrawerNavigator;
