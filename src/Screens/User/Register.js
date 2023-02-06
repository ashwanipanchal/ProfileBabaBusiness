// import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native'
// import React, { useEffect, useState, useRef, useMemo, useCallback, useLayoutEffect } from 'react'
// import { StatusBarDark } from '../../Custom/CustomStatusBar'
// import { ButtonStyle, DisableButton } from '../../Custom/CustomView'
// import Toast from 'react-native-simple-toast';
// import { Api, LocalStorage } from '../../services/Api';
// import { _SetAuthToken } from '../../services/ApiSauce';
// import Geocoder from 'react-native-geocoding';
// import { useDispatch } from 'react-redux';
// // import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
// import BottomSheet from "react-native-gesture-bottom-sheet";
// import { COLORS } from '../../Constant/Colors';
// import { RadioButton } from 'react-native-paper';
// import { SafeAreaView } from 'react-native';
// import { BASE_URL } from '../../services/Config';
// import CheckBox from '@react-native-community/checkbox';

// const Register = ({ navigation }) => {
//   const error = useRef()
//   const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
//   const [isLoading, setIsLoading] = useState(false);
//   const [value, setValue] = useState('');
//   const [locationSelected, setLocationSelected] = useState(false);
//   const [occupation, setOccupation] = useState('');
//   const [subCategory, setSubCategory] = useState('');
//   const [coords, setCoords] = useState('');
//   const [prediction, setPrediction] = useState('');
//   const [clicked, setClicked] = useState(false)
//   const [selectedSubCat, setSelectedSubCat] = useState([])
//   const [state, setState] = useState({
//     name: '',
//     business_name: '',
//     contact_number: '',
//     password: '',
//     isLoading: false,
//     selectedIndex: '',
//   })
//   const [item, setItem] = useState()
//   const [category, setCategory] = useState();
//   const [data, setData] = useState([]);
//   const [tt, setTT] = useState();
//   const [tt2, setTT2] = useState();
//   // Needed in order to use .show()
//   const categorySheet = useRef();
//   const subcategorySheet = useRef();

//   useLayoutEffect(() => {
//     if (!locationSelected && value.toString().trim() != '') {
//       getCountry()
//     }
//   }, [value, locationSelected])

//   useEffect(() => {
//     getCategory()
//   }, [])

//   useEffect(() => {
//     getSubCategory()
//   }, [occupation])

//   const getCategory = async () => {
//     setCategory(null)
//     setIsLoading(true)
//     const response = await Api.categoryListForBusinessRegister()
//     if (response) {
//       setCategory(response.data)
//       setIsLoading(false)
//     }
//   }

//   const getSubCategory = async () => {
//     const response = await fetch(`${BASE_URL}get-subcategory/${state.selectedIndex}`, {
//       method: 'GET',
//       headers: {
//         "Accept": "application/json",
//         'Content-Type': 'application/json',
//       }
//     })
//     const res = await response.json()

//     if (res.data) {
//       setItem(res.data?res.data:[])
//     }
//   }

//   const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
//   const getCountry = async () => {
//     const res = await fetch(`${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${value}&components=country:IN`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const ress = await res.json()
//     setPrediction(ress.predictions)
//   }

//   const onSelectCategory = (item) => {
//     setOccupation(item)
//   }
//   const onSelectSubCategory = (item) => {
//     setSubCategory(item)
//   }

//   const getLocation = async (item) => {
//     Geocoder.init("AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw");
//     const location = await Geocoder.from(item.title)
//     setCoords(location.results[0].geometry.location)
//   }
//   const registerHandler = async () => {

//     Keyboard.dismiss()
//     const {
//       name = '',
//       contact_number = '',
//       password = '',
//     } = state;

//     if (!name) {
//       Toast.show('Please enter your name')
//       return;
//     }
//     if (!state.business_name) {
//       Toast.show('Please enter your business name')
//       return;
//     }

//     if (!contact_number) {
//       Toast.show('Please enter your mobile no.');
//       return;
//     }

//     if (contact_number.length !== 10) {
//       Toast.show('Mobile number must be in 10 digits');
//       return;
//     }
//     if (!occupation) {
//       Toast.show('Please select occupation')
//       return;
//     }
//     if (!value) {
//       Toast.show('Please enter your business location');
//       return;
//     }

//     if (!password) {
//       Toast.show('Please enter your password')
//       return;
//     }

//     // setClicked(true)

//     let arrforsubcat = []
//     if (selectedSubCat.length > 0) {
//       // alert(JSON.stringify(selectedSubCat,null,2))
//       for(const selectedSub of selectedSubCat) {
//         arrforsubcat.push(selectedSub.id)
//       }
//     } else {
//       arrforsubcat.push(occupation.id)
//     }
//     // return
//     const body1 = {
//       "name": state.name,
//       "business_name": state.business_name,
//       "contact_number": state.contact_number,
//       "password": state.password,
//       "address": value,
//       "lat_lng": [coords.lat.toString(), coords.lng.toString()],
//       "category": arrforsubcat
//     }
//     // alert(JSON.stringify(body1,null,2))
//     // return
//     const res = await Api.addVendor(body1)
//     const { success, data, message } = res;
//     // alert(JSON.stringify(res))
//     if (success) {
//       if (Array.isArray(data)) {
//         Toast.show(message)
//         navigation.replace('Login')
//         setClicked(false)
//       } else {
//         Toast.show("OTP has been sent to register number")
//         alert(data.otp)
//         navigation.replace('VerifyOTP', data)
//         setClicked(false)
//       }
//     } else {
//       Toast.show(data.data.contact_number[0])
//       setClicked(false)
//     }
//   }


//   let arr = []
//   for(const selectedSub of selectedSubCat) {
//     arr.push(selectedSub.title)
//   }
//   const selectedSubCategories = arr.join(', ')

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <StatusBarDark />
//       {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
//         <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
//       </TouchableOpacity> */}
//       <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false}>
//         <View>
//           <View style={{ flexDirection: 'row', marginTop: 40 }}>
//             <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 28, marginLeft: 30, fontWeight: '600' }}>Create </Text>
//             <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 28, fontWeight: '600' }}>Account</Text>
//           </View>
//           <Text style={{ color: '#1212128A', marginLeft: 30, marginTop: 15, fontSize: 14 }}>Hello, Welcome back to your account!</Text>
//         </View>
//         <View style={{ marginTop: 40 }}>
//           <TextInput
//             value={state.name}
//             onChangeText={text => setState({ ...state, name: text })}
//             style={styles.textInput}
//             placeholder={'Full Name'}
//             placeholderTextColor={'lightgray'}
//             // error={hasEmailErrors}
//             maxLength={50}
//           />
//           <TextInput
//             value={state.business_name}
//             onChangeText={text => setState({ ...state, business_name: text })}
//             style={styles.textInput}
//             placeholder={'Business Name'}
//             placeholderTextColor={'lightgray'}
//             // error={hasEmailErrors}
//             maxLength={50}
//           />
//           <TextInput
//             value={state.contact_number}
//             onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
//             style={styles.textInput}
//             placeholder={'Mobile No.'}
//             placeholderTextColor={'lightgray'}
//             keyboardType={'number-pad'}
//             // secureTextEntry={true}
//             // error={hasEmailErrors}
//             maxLength={10}
//           />
//           <TouchableOpacity activeOpacity={0.5}
//             // onPress={() => { navigation.navigate('Occupation', {onSelectCategory:onSelectCategory}) }}
//             onPress={() => categorySheet.current.show()}
//             style={{
//               borderColor: '#1212128A', borderWidth: 1, marginHorizontal: 30, padding: 10,
//               height: 56,
//               paddingHorizontal: 15,
//               marginHorizontal: 30,
//               marginTop: 10,
//               marginBottom: 10,
//               borderRadius: 10,
//               justifyContent: 'center'
//             }}>
//             <Text placeholder='Occupation' style={{ color: occupation.title ? 'black' : 'lightgray', fontSize: 16, }}>{occupation.title || 'Occupation'}</Text>
//           </TouchableOpacity>
//           {occupation.title && 
//             (item.length > 0 ? 
//           <TouchableOpacity activeOpacity={0.5}
//             // onPress={() => { 
//             //   if(occupation){
//             //     navigation.navigate('SubCategory', {occupation: occupation, onSelectSubCategory:onSelectSubCategory}) 
//             //   }else{
//             //     Toast.show('Select Occupation First')
//             //   }
//             // }}
//             onPress={() => {
//               if (occupation) {
//                 subcategorySheet.current.show()
//               } else {
//                 Toast.show('Select Occupation First')
//               }
//             }}
//             style={{
//               borderColor: '#1212128A', borderWidth: 1, marginHorizontal: 30, padding: 10,
//               height: 56,
//               paddingHorizontal: 15,
//               marginHorizontal: 30,
//               marginTop: 10,
//               marginBottom: 10,
//               borderRadius: 10,
//               justifyContent: 'center'
//             }}>
//             <Text placeholder='Sub Category Occupation' style={{ color: selectedSubCategories ? 'black' : 'lightgray', fontSize: 16, }}>{selectedSubCategories || 'Sub Category'}</Text>
//           </TouchableOpacity> :null)}
//           {/* <View style={{ flexDirection: 'row', marginHorizontal:20, }}>
//             <GooglePlacesAutocomplete
//               placeholder="Business Location"
//               //   keyboardShouldPersistTaps='handled'
//               query={{
//                 key: GOOGLE_PLACES_API_KEY,
//                 language: 'en', // language of the results
//               }}
//               // renderRightButton={()=>{<View><Image style={{width:24, height:24, marginRight:10}}  source={require('../images/locationicon.png')}/></View>}}
//               styles={{
//                 container: {
//                   flex: 1,
//                   marginHorizontal: 10,
//                   backgroundColor: 'transparent'
//                 },
//                 textInput: {
//                   height: 56,
//                   //   color: '#000',
//                   placeholderTextColor:'lightgray',
//                   borderColor: COLORS.lightGray,
//                   borderWidth: 1,
//                   borderRadius:10,
//                   marginTop:10,
//                   paddingVertical: 10,
//                   backgroundColor: 'transparent',
//                   fontSize: 16,
//                 },

//               }}
//               // enablePoweredByContainer={false}
//               onPress={(data, details = null) => {
//                 getLocation({
//                   title: data.description
//               })
//               }}
//               onFail={(error) => console.error(error)}
//             // this in only required for use on the web. See https://git.io/JflFv more for details.
//             />
//           </View> */}
//           <View style={styles.container}>
//             <TextInput
//               style={styles.textInput}
//               placeholder='Business Location'
//               placeholderTextColor='lightgray'
//               value={value}
//               onChangeText={text => setValue(text)}
//               returnKeyType='next'
//             />
//           </View>
//           <FlatList
//             data={prediction}
//             style={{ marginHorizontal: 30, borderRadius: 10, borderColor: 'gray', borderWidth: prediction.length > 0 ? 1 : 0 }}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => {
//                 // setState({...state, value:item.description})
//                 setValue(item.description)
//                 setLocationSelected(true)
//                 setPrediction('')
//                 getLocation({
//                   title: item.description
//                 })
//               }} style={{ height: 44, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
//                 <Text style={{ fontSize: 13, color: COLORS.lightGray, }}>{item.description}</Text>
//               </TouchableOpacity>
//             )}
//           />
//           <TextInput
//             value={state.password}
//             onChangeText={text => setState({ ...state, password: text })}
//             style={styles.textInput}
//             placeholder={'Password'}
//             placeholderTextColor={'lightgray'}
//             keyboardType={'default'}
//             secureTextEntry={true}
//           // error={hasEmailErrors}
//           // maxLength={10}
//           />

//         </View>
//         <View style={{ alignItems: 'center', marginTop: 30 }}>
//           {/* <View style={{ width: '90%' }}>
//             <ButtonStyle
//               title={'Sign Up'}
//               loader={state.isLoading}
//               onPress={() => {
//                 registerHandler()
//                 // navigation.replace('Home');
//               }}
//             />
//           </View> */}
//           {clicked ?
//             <View style={{ width: '90%' }}>
//               <DisableButton
//                 title={'Sign Up'}
//                 bgColor={COLORS.orange}
//               />
//             </View> :
//             <View style={{ width: '90%' }}>
//               <ButtonStyle
//                 title={'Sign Up'}
//                 loader={state.isLoading}
//                 onPress={() => {
//                   registerHandler()
//                   // navigation.replace('Home');
//                 }}
//               />
//             </View>
//           }
//         </View>
//         <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 20 }}>
//           <Text style={{ color: 'gray' }}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#FB802A' }}>Login</Text></TouchableOpacity>
//         </View>
//       </ScrollView>
//       <BottomSheet draggable={false} radius={20} ref={categorySheet} height={500}>
//         <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10 }}>Select Occupation</Text>
//         <ScrollView>
//           <FlatList
//             style={{}}
//             data={category}
//             renderItem={({ item, index }) => {
//               const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
//               // alert(JSON.stringify(item,null,2))
//               return (
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => {
//                   // navigation.goBack()
//                   // route.params.onSelectCategory(item)
//                   // alert(JSON.stringify(item,null,2))
//                   setTT(index)
//                   setOccupation(item)
//                   setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
//                   setSubCategory('')
//                   setSelectedSubCat([])
//                   setTT2('')
//                   categorySheet.current.close()
//                 }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                   <View style={{ flexDirection: 'row' }}>
//                     <Image source={{ uri: item.icon }} style={{ width: 28, height: 28 }} />
//                     <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
//                   </View>
//                   {/* <View>
//                             <RadioButton
//                                 // value="first"
//                                 // status={checked === 'first' ? 'checked' : 'unchecked'}
//                                 // isSelected={state.selectedIndex === index? 'checked' : 'uncheked'}
//                                 status={isSelected}
//                                 onPress={() => {
//                                     navigation.goBack()
//                                     route.params.onSelectCategory(item)
//                                 }}
//                                 uncheckedColor={'#FB802A'}
//                                 color={'#4285F4'}
//                             />
//                         </View> */}
//                   {tt == index ? <Image style={{ height: 22, width: 22 }} source={require('../../images/done.png')} /> : null}

//                 </TouchableOpacity>
//               )
//             }} />
//         </ScrollView>
//       </BottomSheet>
//       <BottomSheet draggable={false} radius={20} ref={subcategorySheet} height={500}>
//         <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10 }}>Select Sub Category</Text>
//         <ScrollView>
//           {/* {item.length == '0' && <Text style={{ marginLeft: 20, color: COLORS.lightGray }}>No SubCategory Avalibale</Text>} */}
//           <FlatList
//             data={item}
//             renderItem={({ item, index }) => {
//               const isSelected = selectedSubCat.includes(item) ? true : false;
//               // alert(JSON.stringify(item,null,2))
//               return (
//                 <TouchableOpacity activeOpacity={0.8} onPress={() => {
//                   // navigation.goBack()
//                   // route.params.onSelectCategory(item)
//                   setTT2(index)
//                   setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
//                   setSubCategory(item || '')
//                   subcategorySheet.current.close()
//                 }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                   <View style={{ flexDirection: 'row' }}>
//                     <Image source={{ uri: item.icon }} style={{ width: 28, height: 28 }} />
//                     <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
//                   </View>
//                   {/* <View>
//                             <RadioButton
//                                 // value="first"
//                                 // status={checked === 'first' ? 'checked' : 'unchecked'}
//                                 // isSelected={state.selectedIndex === index? 'checked' : 'uncheked'}
//                                 status={isSelected}
//                                 onPress={() => {
//                                     navigation.goBack()
//                                     route.params.onSelectCategory(item)
//                                 }}
//                                 uncheckedColor={'#FB802A'}
//                                 color={'#4285F4'}
//                             />
//                         </View> */}
//                   {/* {tt2 == index?<Image style={{height:22, width:22}} source={require('../../images/done.png')}/>:null} */}
//                   <CheckBox
//                     value={isSelected}
//                     style={{color:'black'}}
//                     disabled={false}
//                     onAnimationType='fill'
//                     offAnimationType='fade'
//                     boxType='square'
//                     onValueChange={newValue => {

//                       setSelectedSubCat(state => {

//                         let selectedValues = [...state]

//                         if(selectedValues.includes(item)) {
//                           let indexOf = selectedValues.findIndex(x => x.id == item.id)
//                           console.log(indexOf)
//                           selectedValues.splice(indexOf, 1)
//                         } else {
//                           selectedValues.push(item)
//                         }
//                         return selectedValues
//                       }) 

//                     }}
//                   />

//                 </TouchableOpacity>
//               )
//             }} />
//         </ScrollView>
//       </BottomSheet>
//     </SafeAreaView>
//   )
// }

// export default Register

// const styles = StyleSheet.create({
//   crossImage: {
//     marginTop: StatusBar.currentHeight,
//     marginLeft: 20,
//     width: '10%',
//     padding: 5,
//     // backgroundColor:'red'
//   },
//   textInput: {
//     borderRadius: 10,
//     borderWidth: 1,
//     padding: 10,
//     height: 56,
//     paddingHorizontal: 15,
//     marginHorizontal: 30,
//     marginTop: 10,
//     marginBottom: 10,
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     fontWeight: '600',
//     backgroundColor: '#fff',
//     borderColor: '#1212128A',
//     color: '#000'
//   },
//   container: {
//     justifyContent: 'center'
//   },
//   inputStyle: {
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     backgroundColor: '#cfcfcf',
//     borderRadius: 20,
//     color: 'black',
//     fontSize: 16
//   },
// })

import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, Keyboard, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback, useLayoutEffect } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { ButtonStyle, DisableButton } from '../../Custom/CustomView'
import Toast from 'react-native-simple-toast';
import { _SetAuthToken } from '../../services/ApiSauce';
import Geocoder from 'react-native-geocoding';
import { useDispatch } from 'react-redux';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { COLORS } from '../../Constant/Colors';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { BASE_URL } from '../../services/Config';
import CheckBox from '@react-native-community/checkbox';
import { Api } from '../../services/Api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Register = ({ navigation }) => {
  const places = useRef()
  const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [locationSelected, setLocationSelected] = useState(false);
  const [occupation, setOccupation] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [coords, setCoords] = useState('');
  const [prediction, setPrediction] = useState('');
  const [clicked, setClicked] = useState(false)
  const [selectedSubCat, setSelectedSubCat] = useState([])
  const [state, setState] = useState({
    name: '',
    business_name: '',
    business_add: '',
    contact_number: '',
    password: '',
    isLoading: false,
    selectedIndex: '',
  })
  const [item, setItem] = useState([])
  const [category, setCategory] = useState();
  const [data, setData] = useState([]);
  const [tt, setTT] = useState();
  const [tt2, setTT2] = useState();
  // Needed in order to use .show()
  const categorySheet = useRef();
  const subcategorySheet = useRef();
  const dummy = []

  useLayoutEffect(() => {
    if (!locationSelected && value.toString().trim() != '') {
      getCountry()
    }
  }, [value, locationSelected])

  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    getSubCategory()
  }, [occupation])


  useEffect(()=>{
    console.log(places.current?.isFocused())
  },[places.current])
  const getCategory = async () => {
    setCategory(null)
    setIsLoading(true)
    const response = await Api.categoryListForBusinessRegister()
    if (response) {
      // alert(JSON.stringify(response,null,2))
      setCategory(response.data)
      setIsLoading(false)
    }
  }

  const getSubCategory = async () => {
    const response = await fetch(`${BASE_URL}get-subcategory/${state.selectedIndex}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res,null,2))
    if (res.data) {
      setItem(res.data ? res.data : [])
    }
  }

  const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place'
  const getCountry = async () => {
    const res = await fetch(`${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${value}&components=country:IN`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
    const ress = await res.json()
    setPrediction(ress.predictions)
  }

  const onSelectCategory = (item) => {
    setOccupation(item)
  }
  const onSelectSubCategory = (item) => {
    setSubCategory(item)
  }

  const getLocation = async (item) => {
    Geocoder.init("AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw");
    const location = await Geocoder.from(item.title)
    // console.log(location.results[0].geometry.location)
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
    if (!state.business_name) {
      Toast.show('Please enter your business name')
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
    if (!occupation) {
      Toast.show('Please select occupation')
      return;
    }
    if (!value) {
      Toast.show('Please enter your business location');
      return;
    }

    if (!password) {
      Toast.show('Please enter your password')
      return;
    }

    // setClicked(true)
    setState({ ...state, isLoading: true });
    let arrforsubcat = []
    if (selectedSubCat.length > 0) {
      // alert(JSON.stringify(selectedSubCat,null,2))
      for (const selectedSub of selectedSubCat) {
        arrforsubcat.push(selectedSub.id)
      }
    } else {
      arrforsubcat.push(occupation.id)
    }
    // return
    const body1 = {
      "name": state.name,
      "business_name": state.business_name,
      "contact_number": state.contact_number,
      "password": state.password,
      "address": state.business_add,
      "location": value,
      // "lat_lng": [coords.lat.toString(), coords.lng.toString()],
      "lat_lng": [parseFloat(coords.lat.toString()), parseFloat(coords.lng.toString())],
      "category": arrforsubcat
    }
    // alert(JSON.stringify(body1,null,2))
    // return
    const res = await Api.addVendor(body1)
    const { success, data, message } = res;
    // alert(JSON.stringify(res))
    if (success) {
      if (Array.isArray(data)) {
        Toast.show(message)
        navigation.replace('Login')
        setClicked(false)
        setState({ ...state, isLoading: false });
      } else {
        Toast.show("OTP has been sent to register number")
        alert(data.otp)
        navigation.replace('VerifyOTP', data)
        setClicked(false)
        setState({ ...state, isLoading: false });
      }
    } else {
      Toast.show(data.data.contact_number[0])
      setClicked(false)
      setState({ ...state, isLoading: false });
    }
  }


  let arr = []
  for (const selectedSub of selectedSubCat) {
    arr.push(selectedSub.title)
  }
  const selectedSubCategories = arr.join(', ')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarDark />
      {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
        <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
      </TouchableOpacity> */}
      <ScrollView keyboardShouldPersistTaps='always' listViewDisplayed={false}>
        <View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
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
            foc
            placeholder={'Full Name'}
            placeholderTextColor={'gray'}
            // error={hasEmailErrors}
            maxLength={50}
          />
          <TextInput
            value={state.business_name}
            onChangeText={text => setState({ ...state, business_name: text })}
            style={styles.textInput}
            placeholder={'Business Name'}
            placeholderTextColor={'gray'}
            // error={hasEmailErrors}
            maxLength={50}
          />
          <GooglePlacesAutocomplete
              placeholder="Business Location"
              placeholderTextColor={'red'}
                keyboardShouldPersistTaps='always'
                listViewDisplayed={'true'}
                ref={places}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en', // language of the results
                components: 'country:in',
              }}
              textInputProps={{
                placeholderTextColor: 'gray',
                color:'black',
                returnKeyType: "search"
              }}
              
              styles={{
                container: {
                  flex: 1,
                  marginHorizontal: 30,
                  backgroundColor: 'transparent',
                },
                
                textInput: {
                  height: 56,
                    color: '#000',
                  borderRadius: 10,
                  marginTop: 10,
                  marginBottom: 5,
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  paddingVertical: 10,
                  backgroundColor: 'transparent',
                  fontSize: 16,
                },
                row: {
                  color:'red',
                },
                listView: {
                  color:'red',
                }
              }}
              // enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                setValue(data.description)
                getLocation({
                  title: data.description
                })
              }}
              onFail={(error) => console.error(error)}
            // this in only required for use on the web. See https://git.io/JflFv more for details.
            />
          <TextInput
            value={state.contact_number}
            onChangeText={text => setState({ ...state, contact_number: text.replace(/[^0-9]/g, '') })}
            style={styles.textInput}
            placeholder={'Mobile No.'}
            placeholderTextColor={'gray'}
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
            <Text placeholder='Occupation' style={{ color: occupation.title ? 'black' : 'gray', fontSize: 16, }}>{occupation.title || 'Occupation'}</Text>
          </TouchableOpacity>
          {occupation.title &&
            (item.length > 0 ?
              <TouchableOpacity activeOpacity={0.5}
                // onPress={() => { 
                //   if(occupation){
                //     navigation.navigate('SubCategory', {occupation: occupation, onSelectSubCategory:onSelectSubCategory}) 
                //   }else{
                //     Toast.show('Select Occupation First')
                //   }
                // }}
                onPress={() => {
                  if (occupation) {
                    subcategorySheet.current.show()
                  } else {
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
                <Text placeholder='Sub Category Occupation' style={{ color: selectedSubCategories ? 'black' : 'gray', fontSize: 16, }}>{selectedSubCategories || 'Sub Category'}</Text>
              </TouchableOpacity> : null)}
          {/* <View style={{ flexDirection: 'row' }}> */}
            
          {/* </View> */}
          <TextInput
            value={state.business_add}
            onChangeText={text => setState({ ...state, business_add: text })}
            style={styles.textInput}
            placeholder={'Business Address'}
            placeholderTextColor={'gray'}
          // error={hasEmailErrors}
          // maxLength={50}
          />
          {/* <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder='Business Location'
              placeholderTextColor='lightgray'
              value={value}
              onChangeText={text => setValue(text)}
              returnKeyType='next'
            />
          </View>
          <FlatList
            data={prediction}
            style={{ marginHorizontal: 30, borderRadius: 10, borderColor: 'gray', borderWidth: prediction.length > 0 ? 1 : 0 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                // setState({...state, value:item.description})
                setValue(item.description)
                setLocationSelected(true)
                setPrediction('')
                getLocation({
                  title: item.description
                })
              }} style={{ height: 44, justifyContent: 'center', padding: 5, marginHorizontal: 10 }}>
                <Text style={{ fontSize: 13, color: COLORS.lightGray, }}>{item.description}</Text>
              </TouchableOpacity>
            )}
          /> */}
          <TextInput
            value={state.password}
            onChangeText={text => setState({ ...state, password: text })}
            style={styles.textInput}
            placeholder={'Password'}
            placeholderTextColor={'gray'}
            keyboardType={'default'}
            secureTextEntry={true}
          // error={hasEmailErrors}
          // maxLength={10}
          />

        </View>
        <View style={{ alignItems: 'center', marginTop: 30 }}>
          {/* <View style={{ width: '90%' }}>
            <ButtonStyle
              title={'Sign Up'}
              loader={state.isLoading}
              onPress={() => {
                registerHandler()
                // navigation.replace('Home');
              }}
            />
          </View> */}
          {clicked ?
            <View style={{ width: '90%' }}>
              <DisableButton
                title={'Sign Up'}
                loader={state.isLoading}
                bgColor={COLORS.orange}
              />
            </View> :
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
          }
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 20 }}>
          <Text style={{ color: 'gray' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#FB802A' }}>Login</Text></TouchableOpacity>
        </View>
      </ScrollView>
      <BottomSheet draggable={false} radius={20} ref={categorySheet} height={500}>
        {/* <Image source={require('../../images/Add.png')} style={{height:22, width:22, resizeMode:"contain", alignSelf:'center', borderRadius:50, borderColor:'black', borderWidth:1, padding:3}}/> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10 }}>Select Occupation</Text>
          <TouchableOpacity onPress={() => { categorySheet.current.close() }}>
            <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <FlatList
            style={{}}
            data={category}
            renderItem={({ item, index }) => {
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
                  setSelectedSubCat([])
                  setTT2('')
                  categorySheet.current.close()
                }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
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
                  {tt == index ? <Image style={{ height: 22, width: 22 }} source={require('../../images/done.png')} /> : null}

                </TouchableOpacity>
              )
            }} />
        </ScrollView>
      </BottomSheet>
      <BottomSheet draggable={false} radius={20} ref={subcategorySheet} height={500}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10 }}>Select Sub Category</Text>
          <TouchableOpacity onPress={() => { subcategorySheet.current.close() }}>
            <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
          </TouchableOpacity>
        </View>
        {/* <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10 }}>Select Sub Category</Text> */}
        <ScrollView>
          {/* {item.length == '0' && <Text style={{ marginLeft: 20, color: COLORS.lightGray }}>No SubCategory Avalibale</Text>} */}
          <FlatList
            data={item}
            renderItem={({ item, index }) => {
              const isSelected = selectedSubCat.includes(item) ? true : false;
              // alert(JSON.stringify(item,null,2))
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  // navigation.goBack()
                  // route.params.onSelectCategory(item)
                  setTT2(index)
                  setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                  setSubCategory(item || '')
                  subcategorySheet.current.close()
                }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
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
                  {/* {tt2 == index?<Image style={{height:22, width:22}} source={require('../../images/done.png')}/>:null} */}
                  <CheckBox
                    value={isSelected}
                    tintColors={{ true: COLORS.orange, false: COLORS.blue }}
                    style={{ color: 'black' }}
                    disabled={false}
                    onAnimationType='fill'
                    offAnimationType='fade'
                    boxType='square'
                    onValueChange={newValue => {

                      setSelectedSubCat(state => {

                        let selectedValues = [...state]

                        if (selectedValues.includes(item)) {
                          let indexOf = selectedValues.findIndex(x => x.id == item.id)
                          console.log(indexOf)
                          selectedValues.splice(indexOf, 1)
                        } else {
                          selectedValues.push(item)
                        }
                        return selectedValues
                      })

                    }}
                  />

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
    // marginTop: StatusBar.currentHeight,
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
  },
})