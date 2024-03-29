import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = props =>
  props.status && (
    <View style={{
      // flex:1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      width: '100%',
      height: '100%',
      zIndex: 10,
      elevation: 10,
    }} {...props}>
      <ActivityIndicator size="large" color='#FB802A' />
    </View>
  );

export default Loader;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    zIndex: 10,
    elevation: 10,
  },
});