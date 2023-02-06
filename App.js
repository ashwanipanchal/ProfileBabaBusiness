import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from './src/redux/store';
import StackNavigator from './src/Navigator/StackNavigator';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  // useEffect(()=>{
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     if(!state.isConnected){
  //       Alert.alert('No Connection', 'Please check your internet connection and Try Again')
  //       // check()
  //     }
  //   });
  //   return (
  //     () => unsubscribe()
  //   )
  // },[])

  const check = () => {
    return(
      alert('No internet')
  )}
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})

