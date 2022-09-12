import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback, useLayoutEffect } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { Api, LocalStorage } from '../../services/Api';
import { _SetAuthToken } from '../../services/ApiSauce';
import Geocoder from 'react-native-geocoding';
import { useDispatch } from 'react-redux';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { COLORS } from '../../Constant/Colors';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { BASE_URL } from '../../services/Config';

const Register = ({ navigation }) => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
  const [isLoading, setIsLoading] = useState(false);
  const [occupation, setOccupation] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [coords, setCoords] = useState('');
  const [prediction, setPrediction] = useState('');
  const [state, setState] = useState({
    name: '',
    business_name: '',
    contact_number: '',
    password: '',
    value: '',
    isLoading: false,
    selectedIndex:'',
  })
  const [item, setItem] = useState()
  const [category, setCategory] = useState();
  const [tt, setTT] = useState();
  const [tt2, setTT2] = useState();
  // Needed in order to use .show()
  const categorySheet = useRef();
  const subcategorySheet = useRef();

  useLayoutEffect(()=> {
    getCategory()
    
    getCountry()
  },[state.value])

  useEffect(()=>{
    getSubCategory()
  },[occupation])

  const getCategory = async () => {
    setCategory(null)
    setIsLoading(true)
    const response = await Api.categoryListForBusinessRegister()
    if (response) {
        setCategory(response.data)
        setIsLoading(false)
    }
}

const getSubCategory = async() => {
  const response = await fetch(`${BASE_URL}get-subcategory/${state.selectedIndex}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    }
  })
  const res = await response.json()

  if (res.data) {
      setItem(res.data)
  }
}

  const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
  const getCountry =async()=> {
    const res = await fetch( `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${state.value}&components=country:IN`,{
      method: 'POST',
      headers:{
        "Content-Type" : "application/json"
      }
    })
    const ress = await res.json()
    // alert(JSON.stringify(ress,null,2)) 
    setPrediction(ress.predictions)
  }

  const onSelectCategory = (item) => {
    setOccupation(item)
  }
  const onSelectSubCategory = (item) => {
    setSubCategory(item)
  }

  const getLocation = async(item) => {
    Geocoder.init("AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw");
    const location = await Geocoder.from(item.title)
    setCoords(location.results[0].geometry.location)
}
  const registerHandler = async () => {
    
    Keyboard.dismiss()
    const {
      name = '',
      contact_number = '',
      password = '',
    } = state;

    if (!name) {
      Toast.show('Please enter your name')
      return;
    }

    if (!contact_number) {
      Toast.show('Please enter your mobile no.');
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
    if (!occupation) {
      Toast.show('Please select occupation')
      return;
    }
    if (!subCategory) {
      Toast.show('Please select subcategory')
      return;
    }

    const body1 = {
      "name":state.name,
      "business_name": state.business_name,
      "contact_number":state.contact_number,
      "password":state.password,
      "address" : state.value,
      "lat_lng":[coords.lat,coords.lng],
      "category":[occupation.title,subCategory.title]
    }
    const res = await Api.addVendor(body1)
    const {success, data, message} = res;
    if(success){
      if(Array.isArray(data)){
        Toast.show(message)
        navigation.replace('Login')
      }else{
        Toast.show("OTP has been sent to register number")
        alert(data.otp)
        navigation.replace('VerifyOTP',data )
      }
    }else{ 
      Toast.show(data.data.contact_number[0])
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarDark />
      {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity> */}
      <ScrollView keyboardShouldPersistTaps='always'  listViewDisplayed={false}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 40 }}>
            <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Create </Text>
            <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Account</Text>
          </View>
          <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Welcome back to your account!</Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <TextInput
            value={state.name}
            onChangeText={text => setState({ ...state, name: text })}
            style={styles.textInput}
            placeholder={'Full Name'}
            placeholderTextColor={'lightgray'}
            // error={hasEmailErrors}
            maxLength={50}
          />
          <TextInput
            value={state.business_name}
            onChangeText={text => setState({ ...state, business_name: text })}
            style={styles.textInput}
            placeholder={'Business Name'}
            placeholderTextColor={'lightgray'}
            // error={hasEmailErrors}
            maxLength={50}
          />
          <TextInput
            value={state.contact_number}
            onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
            style={styles.textInput}
            placeholder={'Mobile No.'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            // secureTextEntry={true}
            // error={hasEmailErrors}
            maxLength={10}
          />
          <TouchableOpacity activeOpacity={0.5}
            // onPress={() => { navigation.navigate('Occupation', {onSelectCategory:onSelectCategory}) }}
            onPress={() => categorySheet.current.show()}
            style={{
              borderColor: '#1212128A', borderWidth: 1, marginHorizontal: 30, padding: 10,
              height: 56,
              paddingHorizontal: 15,
              marginHorizontal: 30,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center'
            }}>
            <Text placeholder='Occupation' style={{ color: occupation.title ? 'black' :'lightgray', fontSize: 16, }}>{occupation.title || 'Occupation'}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}
            // onPress={() => { 
            //   if(occupation){
            //     navigation.navigate('SubCategory', {occupation: occupation, onSelectSubCategory:onSelectSubCategory}) 
            //   }else{
            //     Toast.show('Select Occupation First')
            //   }
            // }}
            onPress={() =>{
              if(occupation){
                  subcategorySheet.current.show()
                  }else{
                    Toast.show('Select Occupation First')
                  }
            }}
            style={{
              borderColor: '#1212128A', borderWidth: 1, marginHorizontal: 30, padding: 10,
              height: 56,
              paddingHorizontal: 15,
              marginHorizontal: 30,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center'
            }}>
            <Text placeholder='Sub Category Occupation' style={{ color: subCategory.title ? 'black' :'lightgray', fontSize: 16, }}>{subCategory.title || 'Sub Category'}</Text>
          </TouchableOpacity>
          {/* <View style={{ flexDirection: 'row', marginHorizontal:20, }}>
            <GooglePlacesAutocomplete
              placeholder="Business Location"
              //   keyboardShouldPersistTaps='handled'
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
              }}
              // renderRightButton={()=>{<View><Image style={{width:24, height:24, marginRight:10}}  source={require('../images/locationicon.png')}/></View>}}
              styles={{
                container: {
                  flex: 1,
                  marginHorizontal: 10,
                  backgroundColor: 'transparent'
                },
                textInput: {
                  height: 56,
                  //   color: '#000',
                  placeholderTextColor:'lightgray',
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  borderRadius:10,
                  marginTop:10,
                  paddingVertical: 10,
                  backgroundColor: 'transparent',
                  fontSize: 16,
                },

              }}
              // enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                getLocation({
                  title: data.description
              })
              }}
              onFail={(error) => console.error(error)}
            // this in only required for use on the web. See https://git.io/JflFv more for details.
            />
          </View> */}
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder='Business Location'
              placeholderTextColor='lightgray'
              value={state.value}
              onChangeText={text => setState({...state, value:text})}
              returnKeyType='next'
            />
          </View>
          <FlatList
            data={prediction}
            style={{ marginHorizontal:30, borderRadius:10,borderColor:'gray', borderWidth: prediction.length > 0 ? 1 : 0}}
            renderItem={({item})=> (
              <TouchableOpacity onPress={()=>{
                setState({...state, value:item.description})
                setPrediction('')
                getLocation({
                  title: item.description
                })
                }} style={{ height:44, justifyContent:'center',padding:5, marginHorizontal:10}}>
                <Text style={{fontSize:13, color:COLORS.lightGray, }}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            value={state.password}
            onChangeText={text => setState({ ...state, password: text })}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'lightgray'}
            keyboardType={'default'}
            secureTextEntry={true}
          // error={hasEmailErrors}
          // maxLength={10}
          />

        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <View style={{ width: '90%' }}>
            <ButtonStyle
              title={'Sign Up'}
              loader={state.isLoading}
              onPress={() => {
                registerHandler()
                // navigation.replace('Home');
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ color: 'gray' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#FB802A' }}>Login</Text></TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet draggable={false} radius={20} ref={categorySheet} height={500}>
        <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical:10 }}>Select Occupation</Text>
        <ScrollView>
        <FlatList
            style={{}}
            data={category}
            renderItem={({ item,index }) => {
                const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
                // alert(JSON.stringify(item,null,2))
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        // navigation.goBack()
                        // route.params.onSelectCategory(item)
                        // alert(JSON.stringify(item,null,2))
                        setTT(index)
                        setOccupation(item)
                        setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                        setSubCategory('')
                        setTT2('')
                        categorySheet.current.close()
                    }} style={{ marginHorizontal: 20, paddingVertical: 10,borderBottomWidth:0.5, borderColor:'lightgray',flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={{ uri: item.icon }} style={{ width: 28, height: 28 }} />
                            <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
                        </View>
                        {/* <View>
                            <RadioButton
                                // value="first"
                                // status={checked === 'first' ? 'checked' : 'unchecked'}
                                // isSelected={state.selectedIndex === index? 'checked' : 'uncheked'}
                                status={isSelected}
                                onPress={() => {
                                    navigation.goBack()
                                    route.params.onSelectCategory(item)
                                }}
                                uncheckedColor={'#FB802A'}
                                color={'#4285F4'}
                            />
                        </View> */}
                        {tt == index?<Image style={{height:22, width:22}} source={require('../../images/done.png')}/>:null}
                        
                    </TouchableOpacity>
                )
            }} />
        </ScrollView>
      </BottomSheet>
      <BottomSheet draggable={false} radius={20} ref={subcategorySheet} height={500}>
        <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical:10 }}>Select Sub Category</Text>
        <ScrollView>
        <FlatList
            data={item}
            renderItem={({ item,index }) => {
                const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
                // alert(JSON.stringify(item,null,2))
                return (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        // navigation.goBack()
                        // route.params.onSelectCategory(item)
                        setTT2(index)
                        setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                        setSubCategory(item)
                        subcategorySheet.current.close()
                    }} style={{ marginHorizontal: 20, paddingVertical: 10,borderBottomWidth:0.5, borderColor:'lightgray',flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={{ uri: item.icon }} style={{ width: 28, height: 28 }} />
                            <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
                        </View>
                        {/* <View>
                            <RadioButton
                                // value="first"
                                // status={checked === 'first' ? 'checked' : 'unchecked'}
                                // isSelected={state.selectedIndex === index? 'checked' : 'uncheked'}
                                status={isSelected}
                                onPress={() => {
                                    navigation.goBack()
                                    route.params.onSelectCategory(item)
                                }}
                                uncheckedColor={'#FB802A'}
                                color={'#4285F4'}
                            />
                        </View> */}
                        {tt2 == index?<Image style={{height:22, width:22}} source={require('../../images/done.png')}/>:null}
                        
                    </TouchableOpacity>
                )
            }} />
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  crossImage: {
    marginTop: StatusBar.currentHeight,
    marginLeft: 20,
    width: '10%',
    padding: 5,
    // backgroundColor:'red'
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    height: 56,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: '#1212128A',
    color: '#000'
  },
  container: {
    justifyContent: 'center'
  },
  inputStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#cfcfcf',
    borderRadius: 20,
    color: 'black',
    fontSize: 16
  }
})