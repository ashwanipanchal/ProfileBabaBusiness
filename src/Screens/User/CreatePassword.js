import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, StatusBar, SafeAreaView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { NavigationActions } from '@react-navigation/native';
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { Api } from '../../services/Api';

const CreatePassword = ({navigation,route}) => {
  const [clicked, setClicked] = useState(false)
  const [state, setState] = useState({
    password: '',
    confirm_password: '',
    isLoading: false
  })
  useEffect(() => {
    console.log("routes in create password screen", route.params)
  }, [])
  
  const loginHandler = async() => {
    const {
      password
    } = state;
    if (!state.password) {
      Toast.show('Please enter password');
      return;
    }
    if (!state.confirm_password) {
      Toast.show('Please enter confirm password');
      return;
    }
    if (state.password != state.confirm_password) {
      Toast.show('Password and Confirm Password Should be Same');
      return;
    }
    setClicked(true)
    const body = {
      otp:route.params.otp,
      contact_number:route.params.mobile,
      password
    }

    setState({ ...state, isLoading: true });
    const response = await Api.createPassword(body);
    const {success, message, data}= response
    console.log(response)
    if(success){
      Toast.show(message)
      navigation.replace('Login')
      setClicked(false)
      setState({ ...state, isLoading: false });
    }else{
      Toast.show(data.data.error)
      navigation.replace('Register')
      setClicked(false)
      setState({ ...state, isLoading: false });
    }
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'
      >
      <View>
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Create </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Password</Text>
          </View>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Create New Password!</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <TextInput
            value={state.password}
            onChangeText={text => setState({ ...state, password: text})}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'lightgray'}
            secureTextEntry
            // error={hasEmailErrors}
            maxLength={10}
          />
          <TextInput
            value={state.confirm_password}
            onChangeText={text => setState({ ...state, confirm_password: text})}
            style={styles.textInput}
            placeholder={'Confirm Password'}
            placeholderTextColor={'lightgray'}
            secureTextEntry
            // error={hasEmailErrors}
            maxLength={10}
          />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: 170, marginTop: 30 }}>
          {/* <View style={{ width: '90%',  }}>
            <ButtonStyle
              title={'Verify'}
              bgColor={'#4285F4'}
              loader={state.isLoading}
              onPress={() => {
                loginHandler()
                  // navigation.navigate('Login');
              }}
            />
          </View> */}
          {clicked ?
          <View style={{width: '90%' }}>
            <DisableButton
            title={'Verify'}
            loader={state.isLoading}
            bgColor={'#4285F4'}
          />
          </View>:
        <View style={{width: '90%' }}>
            <ButtonStyle
            title={'Verify'}
            bgColor={'#4285F4'}
            loader={state.isLoading}
            onPress={() => {
              loginHandler()
            }}
            />
        </View>
        }
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreatePassword

const styles = StyleSheet.create({
    crossImage: {
        marginTop: 0,
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
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        backgroundColor: '#fff',
        borderColor: 'grey',
        color: '#000'
      },
})