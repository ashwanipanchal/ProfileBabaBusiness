import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, TextInput, ScrollView, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton, LoginButton } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../../services/Api';
import { _SetAuthToken } from '../../services/ApiSauce';
import messaging from '@react-native-firebase/messaging';
import { Formik } from 'formik'
import * as yup from 'yup'
import Loader from '../../services/Loader';

const Login = ({ navigation, route }) => {
  const [clicked, setClicked] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [state, setState] = useState({
    contact_number: '',
    password: '',
    isLoading: false
  })
  useEffect(()=>{
    // getFcmToken()
  })
  const getFcmToken = async () => {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        LocalStorage.setFcmToken(fcmToken)
        console.log('-------------fcmToken : ', fcmToken);
      }
    } catch (error) {
      console.log(error, '-------------error');
    }
  };
  const [errors, setErrors] = useState({})
  const loginHandler = async() => {
    Keyboard.dismiss()
    const {
      contact_number = '',
      password = '',
    } = state;

    if (!contact_number) {
      Toast.show('Please enter your mobile no.');
      // handleError('Please Input Number', 'number')
      return;
    }

    if (contact_number.length !== 10) {
      Toast.show('Mobile number must be in 10 digits');
      return;
    }

    if (!password) {
      Toast.show('Please enter your password')
      return;
    }
    setClicked(true)
    setButtonLoading(true)
    const body = {
      contact_number,
      password,
      device_key: await messaging().getToken()
    };
    // alert(JSON.stringify(body,null,2))
    // return
    // setState({ ...state, isLoading: true });
    const response = await Api.login(body)
    console.log(response)
    const {success, data, message} = response;
    // alert(JSON.stringify(response,null,2))
    // return;
    // setState({ ...state, isLoading: false });
    if(success){
      Toast.show(message)
      LocalStorage.setUserDetail(JSON.stringify(data.user));
      LocalStorage.setToken(data.token);
      getFcmToken()
      _SetAuthToken(data.token);
      navigation.reset({
        index: 0,
        routes: [{name : 'DrawerNavigator'}]
      })
      setClicked(false)
      setButtonLoading(false)
    }else{
      Toast.show(data.message)
      setClicked(false)
      setButtonLoading(false)
      // navigation.replace('Login')
    }
  }

  // const handleError = (errorMessage, input) => {
  //   setErrors(prevState => ({...prevState, [input]: errorMessage}))
  // }
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* {buttonLoading ? 
      <View style={{backgroundColor:'transparent', flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator color={'red'} size={'large'} />
      </View> : */}
      <ScrollView
         contentContainerStyle={{flexGrow: 1}}
         keyboardShouldPersistTaps='handled'
      >
        <View style={{}}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Login </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Account</Text>
          </View>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Welcome back to your account!</Text>
        </View>
        <View style={{ marginTop: 40 }}>
        <View style={{height:56,flexDirection:'row', alignItems:'center', marginHorizontal:30, borderColor:'gray', borderWidth:1, borderRadius:10, paddingHorizontal:14, marginBottom:20}}>
            <TextInput
              value={state.contact_number}
              onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
              style={{flex:1, fontSize:16, fontFamily:'Poppins-SemiBold',color:'black'}}
              placeholder={'Mobile No.'}
              placeholderTextColor={'lightgray'}
              keyboardType={'number-pad'}
              // error={errors.contact_number}
              // secureTextEntry={true}
              // error={hasEmailErrors}
              maxLength={10}
            />
            <Image style={{width:28, height:28}} source={require('../../images/phonereg.png')}/>
          </View>
          <View style={{height:56,flexDirection:'row', alignItems:'center', marginHorizontal:30, borderColor:'gray', borderWidth:1, borderRadius:10, paddingHorizontal:14, marginBottom:10,justifyContent:'center'}}>
            <TextInput
              value={state.password}
              onChangeText={text => setState({ ...state, password: text })}
              style={{flex:1, fontSize:16, fontFamily:'Poppins-SemiBold',color:'black', alignSelf:'center'}}
              placeholder={'Password'}
              placeholderTextColor={'lightgray'}
              keyboardType={'default'}
              secureTextEntry={true}
              // error={hasEmailErrors}
              // maxLength={10}
            />
            <Image style={{width:28, height:28}} source={require('../../images/passwordreg.png')}/>
          </View>
          <TouchableOpacity onPress={()=>{navigation.navigate('ForgotPassword')}}>
          <Text style={{ color: '#FB802A', alignSelf: 'flex-end', marginRight: 30, fontSize: 14, marginTop: 10 }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 }}>
        {clicked ?
           <View style={{ width: '90%' }}>
            <DisableButton
            title={'Login'}
            loader={buttonLoading}
            bgColor={'#4285F4'}
          />
          </View>:
          <View style={{ width: '90%' }}>
            <ButtonStyle
              title={'Login'}
              loader={buttonLoading}
              bgColor={'#4285F4'}
              onPress={() => {
                loginHandler()
              }}
            />
          </View>
          }
          {/* <View style={{ width: '90%', }}>
            <LoginButton
              title={'Login with OTP'}
              onPress={() => {
                navigation.navigate('VerifyOTP');
              }}
            />
          </View> */}
          <TouchableOpacity>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row',marginVertical:20}}>
            <Text style={{ color: 'gray' }}>Not register yet? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{ color: '#FB802A' }}>Create Account</Text></TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  crossImage: {
    marginTop: StatusBar.currentHeight,
    marginLeft: 20,
    width: '10%',
    padding: 5,
    // backgroundColor:'red'
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
})