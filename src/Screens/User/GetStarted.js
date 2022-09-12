import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBarLight } from '../../Custom/CustomStatusBar'
import { ButtonStyle, LoginButton } from '../../Custom/CustomView';
import { COLORS } from '../../Constant/Colors';
const { height } = Dimensions.get('window');

const GetStarted = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:'#FFF'}}>
      <StatusBarLight/>
      <Image style={styles.image} source={require('../../images/logo.png')} />
      <Text style={{color:COLORS.lightBlack, alignSelf:'center', fontSize:28, marginBottom:20}}>Business</Text>
      <View style={{flexDirection:'column',alignItems:'center', justifyContent:'space-between', height:170, }}>
      <View style={{width: '80%' }}>
          <ButtonStyle
            title={'Sign Up'}
            onPress={() => {
              navigation.replace('Register');
            }}
          />
        </View>
        <View style={{width: '80%',}}>
          <LoginButton
            title={'Login'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
        <TouchableOpacity>
        <Text style={{fontSize:14, color:'gray'}}></Text>
        </TouchableOpacity>
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