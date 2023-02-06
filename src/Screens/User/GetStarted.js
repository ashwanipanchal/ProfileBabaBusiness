import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBarLight } from '../../Custom/CustomStatusBar'
import { ButtonStyle, LoginButton } from '../../Custom/CustomView';
import { COLORS } from '../../Constant/Colors';
const { height } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';

const GetStarted = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{}}>
        <Animatable.View style={{ alignItems:'center', paddingTop:20  }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginTop:30 }} source={require('../../images/group3.png')} animation="slideInDown" />
        </Animatable.View>
        <Animatable.View style={{ alignItems:'flex-end',paddingRight:20 }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginBottom:30, marginRight:30 }} source={require('../../images/group1.png')} animation="slideInRight" />
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain' }} source={require('../../images/group2.png')} animation="slideInRight" />
        </Animatable.View>
        <Animatable.View style={{  alignItems:'flex-start', paddingLeft:20 }}>
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain', marginBottom:30, marginLeft:30, marginTop:-20 }} source={require('../../images/group4.png')} animation="slideInLeft" />
          <Animatable.Image style={{ width: 56, height: 56, resizeMode: 'contain' }} source={require('../../images/group5.png')} animation="slideInLeft" />
        </Animatable.View>
      </View>
      <Animatable.View style={{}}>
          <Animatable.Image style={{height:'80%', width:'50%', resizeMode:'contain', alignSelf:'center', marginTop:-280,}} source={require('../../images/logo.png')} animation="slideInUp" />
        <Animatable.Text style={{color:COLORS.lightBlack,  fontSize:28, alignSelf:'center',}} animation="slideInUp" >Business</Animatable.Text>
        </Animatable.View>
      <View style={{ flexDirection: 'column', alignItems: 'center',  height: 170, position:'absolute', bottom:'25%', width:'100%',  }}>
        <View style={{ width: '80%', marginVertical:20 }}>
          <ButtonStyle
            title={'Sign Up'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
        <View style={{ width: '80%', }}>
          <LoginButton
            title={'Login'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    image: {
      // backgroundColor:'red',
        marginTop: height /5,
        width: '60%',
        height: '35%',
        resizeMode: 'contain',
        alignSelf: 'center',
        // backgroundColor:'red'
      },
})