import { StyleSheet, Text, View } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React,{useRef} from 'react'
import Splash from '../Screens/Splash';
import GetStarted from '../Screens/User/GetStarted';
import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import ForgotPassword from '../Screens/User/ForgotPassword';
import VerifyOTP from '../Screens/User/VerifyOTP';
import VerifyOTPforForgotPassword from '../Screens/User/VerifyOTPforForgotPassword';
import Home from '../Screens/User/Home';
import CreatePassword from '../Screens/User/CreatePassword';
import Account from '../Screens/User/Account';
import AccountProfile from '../Screens/User/AccountProfile';
import Notification from '../Screens/User/Notification';
import BookingHistory from '../Screens/User/BookingHistory';
import BookingHistoryMessages from '../Screens/User/BookingHistoryMessages';
import BookingHistoryCalls from '../Screens/User/BookingHistoryCalls';
import VendorList from '../Screens/User/VendorList';
import SearchLocation from '../Screens/User/SearchLocation';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';
import UserChatScreen from '../Screens/User/UserChatScreen';
import PersonalChat from '../Screens/User/PersonalChat';
import DialedCallScreen from '../Screens/User/DialedCallScreen';
import Chats from '../Screens/User/Chats';
import Leads from '../Screens/User/Leads';
import Offers from '../Screens/User/Offers';
import AdminChat from '../Screens/User/AdminChat';
import Occupation from '../Screens/User/Occupation';
import SubCategory from '../Screens/User/SubCategory';
import AllLeads from '../Screens/User/AllLeads';
import ThisWeekLeads from '../Screens/User/ThisWeekLeads';
import PaymentSuccess from '../Screens/User/PaymentSuccess';
import TabNavigatorTest from './TabNavigatorTest';
import ExecutivesNumber from '../Screens/User/ExecutivesNumber';
import UploadProfilePicture from '../Screens/User/UploadProfilePicture';
import WebViewScreen from '../Screens/User/WebViewScreen';
import ExtraVendorList from '../Screens/User/ExtraVendorList';
import TempScreen from '../Screens/User/TempScreen';
import Login1 from '../Screens/User/Login1';
import FilterLeads from '../Screens/User/FilterLeads';


const Stack = createStackNavigator();

const StackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const screenOptionStyle = {
        // headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
    };

    // const linking = {
    //     prefixes: ['https://mychat.com', 'mychat://'],
    //     config: {
    //       screens: {
    //         Home: 'feed/:sort',
    //       },
    //     },
    //   };

    const navigationRef = useRef();
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'Splash'}
                screenOptions={screenOptionStyle}>
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabNavigator"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabNavigatorTest"
                    component={TabNavigatorTest}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login1"
                    component={Login1}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Occupation"
                    component={Occupation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SubCategory"
                    component={SubCategory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyOTP"
                    component={VerifyOTP}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VerifyOTPForgotPassword"
                    component={VerifyOTPforForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreatePassword"
                    component={CreatePassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Chats"
                    component={Chats}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Leads"
                    component={Leads}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FilterLeads"
                    component={FilterLeads}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllLeads"
                    component={AllLeads}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ThisWeekLeads"
                    component={ThisWeekLeads}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Offers"
                    component={Offers}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistory"
                    component={BookingHistory}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistoryMessages"
                    component={BookingHistoryMessages}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BookingHistoryCalls"
                    component={BookingHistoryCalls}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ExecutivesNumber"
                    component={ExecutivesNumber}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WebViewScreen"
                    component={WebViewScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UploadProfilePicture"
                    component={UploadProfilePicture}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccountProfile"
                    component={AccountProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TempScreen"
                    component={TempScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VendorList"
                    component={VendorList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ExtraVendorList"
                    component={ExtraVendorList}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchLocation"
                    component={SearchLocation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserChatScreen"
                    component={UserChatScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AdminChat"
                    component={AdminChat}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PersonalChat"
                    component={PersonalChat}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DialedCallScreen"
                    component={DialedCallScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PaymentSuccess"
                    component={PaymentSuccess}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})