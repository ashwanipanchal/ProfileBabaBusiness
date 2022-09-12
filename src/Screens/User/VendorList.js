import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, StatusBar, ScrollView, FlatList, Modal, Dimensions, Linking, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import LinearGradient from 'react-native-linear-gradient'
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Api, LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import Geocoder from 'react-native-geocoding';
import moment from 'moment'
import ChatScreen from '../../Components/ChatScreen'
import TestChatScreen from '../../Components/TestChatScreen'
import {RadioButton} from 'react-native-paper'
import Loader from '../../services/Loader'
const {height} = Dimensions.get('window');

const VendorList = ({navigation, route}) => {
    const GOOGLE_PLACES_API_KEY = 'AIzaSyDMfsTk4NHW07RutlBqQ9hl95QtELwvCWk'
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [placeName, setPlaceName] = useState('');
    const [modalIndex, setModalIndex] = useState('');
    const [newData, setNewData] = useState([]);
    const [userDetail, setUserDetail] = useState();
    const [seletedIndex, setSeletedIndex] = useState(0);
    const [sub_category, setSub_Category] = useState([]);
    const [Loading, setLoading] = useState(false)
    const refRBSheet = useRef();
    const refRBSheet2 = useRef();
    const [location, setLocation] = useState({});
    const [locationName, setLocationName] = useState('');

    const [messages, setMessages] = useState([]);
    const [EachMessages, setEachMessages] = useState('');
    const [userID, setUserID] = useState();

    useEffect(()=>{
      getAdminChat()
    },[])
  
    const getAdminChat = async () => {
      const user = (await LocalStorage.getUserDetail() || '')
      const token = (await LocalStorage.getToken() || '')
      const newUser = JSON.parse(user)
      setUserID(newUser.id)
      // alert(JSON.stringify(user,null,2))
      const btoken = `Bearer ${token}`;
      const response = await fetch(`${BASE_URL}get-admin-chat/${newUser.id}`, {
      // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      // alert(JSON.stringify(res,null,2))
      const newDate = res.data[0].history.map((i)=>{
        let date = moment(i.created_at).format('DD/MMM/yyyy')
        let time = moment(i.created_at).format('h:mm a');
        
        return {...i, time, date}
      })
      // alert(JSON.stringify(newDate,null,2))
      setMessages(newDate)
      // alert(JSON.stringify(res.data[0].history, null, 2))
      
      console.log(date)
      return
      
      const newMapData = [];
      for (let value of res.data) {
        if(value.sender_id === userID){
  
          newMapData.push({_id : value.sender_id, text: value.message, createdAt: value.created_at, });
        }else{
          newMapData.push({_id : userID, text: value.message, createdAt: value.created_at, });
        }
      }
      alert(JSON.stringify(newMapData, null, 2))
      // setMessages([
        
      //   ])
      // setMessages(...res.data.history, user={_id: 2})
    }
    const onSelect = (item, name) => {
      // alert(JSON.stringify(item))
      // return;
        setLocation(item);
        setLocationName(name)
      };
    const onSearch = item => {
      alert(JSON.stringify(item,null,2))
      };

        // ref
        const bottomSheetRef = useRef(null);

        // variables
        const snapPoints = useMemo(() => ['1%', '25%', '50%', '75%', '100%'], []);

        // callbacks
        const handleSheetChanges = useCallback((index) => {
          console.log('handleSheetChanges', index);
        }, []);
        // const [toOpen, setToOpen] = useState(false)
    const [data, setData] = useState([
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
        {
            image: require('../../images/avatar3.png'),
            name: 'Ravi Verma',
            category: 'Plumber',
            rating: '3.5',
            starIcon: require('../../images/star.png'),
            locationU : 'Sec 40',
            distance : '5.2 Kms',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
        },
    ])
    useEffect(()=>{
        // alert(JSON.stringify(route.params,null,2))
        // alert(modalOpen)
        getCityNameFromLatLon()
        checkVendorAvalibility(location)
        
    },[])

    const sendChatToAdmin = async() => {
      const body = {
        "user_id":userID,
        "message":EachMessages
       }
      //  alert(JSON.stringify(messages,null,2))
      const response = await Api.sendchattoadmin(body)
      setEachMessages('')
      const {success} = response
      if(success){
        getAdminChat()
      }
    }

    const getCityNameFromLatLon = async() => {
      setLoading(true)
      Geocoder.init('AIzaSyAUA0Tr4oFc_BNL9DEeVWayBDUcd2GeYxw');
      const response = await Geocoder.from(route.params.coords.coords.latitude, route.params.coords.coords.longitude);
      const cityArray = response.results[0].formatted_address.split(',');
      const city = cityArray[cityArray.length - 3]
      setPlaceName(city)
    }
    const openCallModal = (index) => {
        setModalIndex(index)
        setModalOpen1(true)
    }
    const openMessageModal = (item,index) => {
        setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    const getSubCategory = async() => {
        const token = (await LocalStorage.getToken() || '')
        const btoken = `Bearer ${token}`;
        const response = await fetch(`${BASE_URL}get-subcategory/${route.params.vendor.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
          }
        })
        const res = await response.json()
        // alert(JSON.stringify(res,null,2))
        if(res.success){
            setSub_Category(res.data)
            refRBSheet.current.open()
        }
    }
    const checkVendorAvalibility = async (loc) => {
        const user = (await LocalStorage.getUserDetail() || '')
        const newUser = JSON.parse(user)
        let lat = 28.5960683
        let lng = 76.9994036
        if(Object.keys(location).length > 0) {
            lat = loc.lat
            lng = loc.lng
        }
        const body = {
          "category_id": route.params.vendor.id,
          "location": {
            "lat": lat,
            "lng": lng,
            // "name": 'Delhi'
          },
          "user_id": newUser.id
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const response = await Api.getVendorList(body)
        const { success, data } = response;
        setLoading(false)
        if (success) {
            // alert(JSON.stringify(data,null,2))
            // return
          setNewData(data)
        } else {
          handleSheetOpen(2)
        //   Toast.show("No Vendor Found")
        //   alert("No Vendor Found")
          // setBottomSheetIndex(1)
          // handleSheetChanges(1)
          // snapPoints=()=>{['70%']}
          
          refRBSheet2.current.open()
          
        }
      }

      const handleSheetOpen = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index)
      },[])
      useEffect(() => {
        if(Object.keys(location).length > 0) {
            checkVendorAvalibility(location)
        }
      }, [location])
  return (
      <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
          <StatusBarDark backgroundColor={'#F5F5F5'} />
          <Loader status={Loading}/>
          <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: StatusBar.currentHeight, alignItems: 'center' , width:'100%'}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{color:COLORS.orange, fontSize:20, fontWeight:'700', width:'50%', textAlign:'center'}}><Text style={{color:COLORS.blue}}>{route.params.vendor.title}</Text> in {locationName?locationName: placeName}</Text>
              <TouchableOpacity onPress={() => {navigation.navigate('SearchLocation',{onSelect:onSelect},{onSearch:onSearch})}} style={{marginRight:20, justifyContent:'flex-end'}} >
                  <Image source={require('../../images/locationicon.png')} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
              </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=> {getSubCategory()}} style={{width:'90%', height:50, backgroundColor:'#FFF', alignSelf:'center', marginTop:15, borderRadius:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
            <Text style={{color:COLORS.lightBlack, marginLeft:15, fontSize:16, fontFamily:'Poppins-Regular'}}>Sub Categories</Text>
            <Image source={require('../../images/forwardarrow.png')} style={{width:24, height:24, marginRight:15}}/>
          </TouchableOpacity>
          <ScrollView>
            <FlatList
                data={newData}
                renderItem={({item,index})=>(
                    <View style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#FFF', padding:10, marginBottom:2, alignItems:'center'}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                        <Image source={require('../../images/avatar3.png')} style={{width:52, height:52, marginTop:8,resizeMode:'contain'}}/>
                        <View style={{justifyContent:'flex-start', marginLeft:10, width:'70%'}}>
                            <Text style={{color:COLORS.black, fontSize:18,}}>{item.business_name}</Text>
                            <View style={{flexDirection:'row', alignItems:'center', }}>
                                <Text style={{color:COLORS.orange}}>{route.params.vendor.title}</Text>
                                <Text style={{color:'gray', marginLeft:5}}>•  3.5</Text>
                                <Image source={require('../../images/star.png')} style={{width:16, height:16, marginLeft:10, marginTop:5}}/>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row', alignItems:'center'}}> 
                                <Image source={require('../../images/graylocation.png')} style={{width:16, height:16,  marginTop:5, marginRight:5}}/>
                                <Text style={{color:'gray'}}>{item.address.slice(0, 10)}...</Text>
                              </View>
                                <Text style={{color:'gray', marginLeft:5}}>•  {Math.round(item.distance)} Kms</Text>
                            </View>
                        </View>
                        </View>
                        <View style={{flexDirection:'row', marginRight:10}}>
                            <TouchableOpacity onPress={()=>openCallModal(index)}>
                                <Image source={require('../../images/call.png')} style={{width:52, height:52, marginRight:15}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openMessageModal(item,index)}>
                                <Image source={require('../../images/messagebig.png')} style={{width:52, height:52}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

          </ScrollView>
          <LinearGradient
              colors={['#F55B54', '#FAAD3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 10,
                marginHorizontal: 10,
                height:100,
                borderRadius: 10,
                marginTop: 15,
                marginBottom:20
              }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:24, color:'#fff'}}>Grow your {`\n`} Business</Text>
                    <View style={{}}>
                        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10, backgroundColor:'#FFF', borderRadius:8, marginLeft:10}}><Text style={{color:'#F7754C'}}>Sign Up for Free</Text></TouchableOpacity>
                        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10,  borderRadius:8, alignSelf:'center'}}><Text style={{color:'#fff'}}>Call Us</Text></TouchableOpacity>
                    </View>
                </View>
              </LinearGradient>
              <RBSheet
                ref={refRBSheet}
                height={500}
                animationType={'fade'}
                minClosingHeight={10}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "lightgray",
                        width:70
                    },
                    container:{
                        borderTopRightRadius:20,
                        borderTopLeftRadius:20,
                        minHeight:80
                    }
                }}>
                    <ScrollView>
                  <FlatList
                      style={{ marginBottom: 20 }}
                      data={sub_category}
                      renderItem={({ item, index }) => {
                        const isSelected = seletedIndex === index ? 'checked' : 'unchecked';
                        return (
                        <View style={{backgroundColor: '#fff', padding: 10}}>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            setSeletedIndex(index);
                            // navigation.goBack();
                            // route.params.onSelect(item);
                          }}>
                          <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <View style={{marginLeft: 10}}>
                              <RadioButton
                                status={isSelected}
                                onPress={() => {
                                  setSeletedIndex(index);
                                //   navigation.goBack();
                                //   route.params.onSelect(item);
                                }}
                              />
                            </View>
                            <Text style={{color:'#000'}}>{item.title}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>)
                                // <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 0.5, padding: 10 , marginHorizontal:20, alignItems:'center'}}>
                                //     <Image style={{ width: 48, height: 48 }} source={require('../../images/executive.png')} />
                                //     <Text style={{ color: COLORS.profileBlackText }}>{item.title}</Text>
                                // </View>
                    }} />
                    </ScrollView> 
            </RBSheet>

            <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        // onClose={()=> {setToOpen(false)}}
        >
        <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 0.5, padding: 10 }}>
          <Image style={{ width: 48, height: 48 }} source={require('../../images/executive.png')} />
          <View>
            <Text style={{ color: COLORS.profileBlackText }}>Mr. Kristin Watson</Text>
            <Text style={{ color: COLORS.lightGray }}>Profile Baba Executive</Text>
          </View>
        </View>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <FlatList
              data={messages}
              renderItem={({item})=> (
                <View>
                  {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
                  {/* <View>
                    <Text style={{color:'black'}}>{item.date}</Text>
                  </View> */}
                  {item.sender === 'user'?
                    (
                      <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
                        <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
                        <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                      </View>
                    ) :
                    (
                      <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
                        <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
                        <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                      </View>
                    )
                  }  
                </View>
              )}
            />
        </BottomSheetScrollView>
        <View style={{ flexDirection: 'row', marginVertical:10, marginHorizontal:10}}>
            <TextInput
             style={styles.textInput}
             value={EachMessages}
              onChangeText={text => setEachMessages(text)} 
              placeholder={'Write your message here...'}
              placeholderTextColor='lightgray'
            ></TextInput>
            <TouchableOpacity onPress={()=>sendChatToAdmin()}>
              <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
            </TouchableOpacity>
          </View> 
      </BottomSheet>

            {/* <RBSheet
                ref={refRBSheet2}
                // closeOnDragDown={true}
                height={600}
                keyboardAvoidingViewEnabled={true}
                animationType={'fade'}
                minClosingHeight={10}
                // closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(255,255,255,0.4)",
                    },
                    draggableIcon: {
                        backgroundColor: "lightgray",
                        width:70
                    },
                    container:{
                        borderTopRightRadius:20,
                        borderTopLeftRadius:20,
                        minHeight:80
                    }
                }}>
                    <View style={{flexDirection:'row', borderBottomColor:'lightgray', borderBottomWidth:0.5, padding:10}}>
                      <Image style={{width:48, height:48}} source={require('../../images/executive.png')}/>
                      <View>
                        <Text style={{color:COLORS.profileBlackText}}>Mr. Kristin Watson</Text>
                        <Text style={{color:COLORS.lightGray}}>Profile Baba Executive</Text>
                      </View>
                    </View>
                    <ChatScreen/> */}
                    {/* <View style={{flexDirection:'row', position: 'absolute',bottom: 0, marginBottom: 10, justifyContent:'space-between',marginHorizontal:10 }}>
                      <TextInput style={styles.textInput}></TextInput>
                      <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48 }} />
                    </View>   */}

                    {/* <TestChatScreen/> */}
            {/* </RBSheet> */}
            
            <Modal
                visible={modalOpen}
                transparent={true}
                onRequestClose={() => setModalOpen(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Message via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('PersonalChat',{userDetail, client:newData[modalIndex]})
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/modalmsg.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                          setModalOpen(false)
                          Linking.openURL(`whatsapp://send?text=hello&phone=${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalwhatsapp.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Whats App</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`sms:${newData[modalIndex].contact_number}?body=yourMessage`)
                          }} style={{flexDirection:'row', marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalmail.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Text Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalOpen1}
                transparent={true}
                key={newData.index}
                onRequestClose={() => setModalOpen1(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Call via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
      </View>
  )
}

export default VendorList

const styles = StyleSheet.create({
    crossImage: {
        // marginTop: StatusBar.currentHeight,
        marginLeft: 20,
        alignItems:'center',
        marginRight:20,
        width: '10%',
        padding: 5,
        backgroundColor:'#FFF',
        borderRadius:10
      },
      textInput: {
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        // width: '80%',
        // paddingHorizontal: 15,
        // marginHorizontal: 10,
        // marginTop: 10,
        // position: 'absolute',
        // bottom: 0,
        // marginBottom: 10,
        marginRight:10,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        flex:2,
        backgroundColor: '#fff',
        borderColor: 'grey',
        color: '#000'
      },
      modal_View: {
        backgroundColor: '#000000aa',
        flex: 1,
      },
      modelMainBox: {
        padding:10,
        backgroundColor: '#FFFFFF',
        marginTop: height / 3,
        marginHorizontal: 20,
        borderRadius: 20,
      },
      text: {
        fontFamily: 'Muli-Bold',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#1E1F20',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 25,
      },
})