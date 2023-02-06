import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, StatusBar, FlatList, ScrollView, Modal, RefreshControl, Alert, Dimensions, Button, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import AllLeads from './AllLeads'
import { BASE_URL } from '../../services/Config'
import { LocalStorage } from '../../services/Api'
import { COLORS } from '../../Constant/Colors'
import BottomSheet from "react-native-gesture-bottom-sheet";
import Calendar from "react-native-calendar-range-picker";
const {height, width} = Dimensions.get('window');
import DatePicker from 'react-native-date-ranges';
import { FloatingAction } from 'react-native-floating-action'
import moment from 'moment'
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

const Leads = ({ navigation }) => {
  const optionSheet = useRef();
  const optionSheetforoption = useRef();
  const [leadData, setLeadData] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [leadList, setLeadList] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState('');
  const [leadStatus, setLeadStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [tt, setTT] = useState();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [notificationCount, setNotificationCount] = useState();

  useEffect(()=>{
    const unsubscribe = NetInfo.addEventListener(state => {
      // alert(JSON.stringify(state,null,2))  
      if(!state.isConnected){
        Alert.alert('No Connection', 'Please check your internet connection and Try Again')
        // check()
      }else{
        getPlanHistory()
        getNotification()
      }
    });
    return (
      () => unsubscribe()
    )
  },[])

  useEffect(() => {
    getPlanHistory()
    const willFocusSubscription = navigation.addListener('focus', () => {
      getPlanHistory();
      getNotification()
    });

    return willFocusSubscription
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>{
      getPlanHistory();
      setRefreshing(false)});
    }, []);
    
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
  const getNotification = async () => {
    const user = (await LocalStorage.getUserDetail() || '')
    const token = (await LocalStorage.getToken() || '')
    const newUser = JSON.parse(user)
    // alert(JSON.stringify(user,null,2))
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}notification/${newUser.id}`, {
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
    const {success} = res;
    if(success){
      setNotificationCount(res.data.count)
    }
  }

  
  const getPlanHistory = async () => {
    setIsLoading(true)
    const token = (await LocalStorage.getToken() || '')
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}all-vendor-lead/${newUser.id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res.data.data,null,2))
    // return
    setIsLoading(false)
    setLeadData(res.data.leads_count)
    setLeadList(res.data.data.reverse())
  }

  const optionData = [
    {
      title: 'New',
      id: 0
    },
    {
      title: 'Follow Up',
      id: 1
    },
    {
      title: 'Completed',
      id: 2
    },
    {
      title: 'Not Interested',
      id: 3
    },
    {
      title: 'Not Reachable',
      id: 4
    },
    {
      title: 'Contacted',
      id: 5
    },
    {
      title: 'Read',
      id: 6
    },
  ]

  const optionData1 = [
    {
      title: 'Today',
      id: 10
    },
    {
      title: 'Custom Date',
      id: 11
    },
  ]

  const customButton = (onConfirm) => (
    <Button
        onPress={onConfirm}
        style={{backgroundColor:'red', container:{ width:'100%', marginHorizontal:'3%'}, text:{ fontSize: 22 } }}
        // primary
        title='Select'
    />)

    const openMessageModal = (item,index) => {
      // alert(JSON.stringify(item,null,2))
        setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    const openOptionModal = (index) => {
      // alert(JSON.stringify(index,null,2))
        // alert(JSON.stringify(index,null,2))
        // setUserDetail(item)
        setTT(index.status)
        setModalIndex(index)
        optionSheetforoption.current.show()
    }

  const showCalender = async (item) => {
    optionSheet.current.close()
    navigation.navigate('FilterLeads', {item, optionData1})
  }
  const showCalender1 = async (item) => {
    optionSheet.current.close()
    navigation.navigate('FilterLeads', {item, optionData})
  }

  const updateLead = async() => {
    // alert(JSON.stringify(modalIndex.id, null, 2))
    optionSheetforoption.current.close()
    setIsLoading(true)
    const user = (await LocalStorage.getUserDetail() || '')
    const token = (await LocalStorage.getToken() || '')
    const newUser = JSON.parse(user)
    // alert(JSON.stringify(newUser,null,2))
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}update-lead/${modalIndex.id}/${leadStatus}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    setIsLoading(false)
    getPlanHistory()
    // alert(JSON.stringify(res,null,2))
    // console.log(JSON.stringify(res))
    // alert(JSON.stringify(modalIndex, null, 2))
    // alert(JSON.stringify(leadStatus,null,2))
  }
  const  tempArr = [{
    title: 'hi'
  }]
  if(!isLoading && leadList.length == '0' ){
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 10
      }}>
        <TouchableOpacity onPress={() => {
          navigation.openDrawer()
        }} style={styles.crossImage}>
          <Image source={require('../../images/homemenu.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <Image source={require('../../images/homelogo.png')} style={{ width: 129, height: 40, resizeMode: 'contain' }} />
        <View style={styles.crossImage}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Notification') }} >
            <Image source={require('../../images/homebell.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
          {notificationCount > 0 &&
            // <Text style={{ color: 'white', position: 'absolute', top: -2, right: 1, backgroundColor: 'red', borderRadius: 70, paddingHorizontal: 5, elevation:8 }}>{notificationCount}</Text>
            <View style={{position: 'absolute', top: -10, right: -2,backgroundColor: 'red', borderRadius: 50, paddingHorizontal: 3,paddingVertical:2, }}>

          <Text  style={{ color: 'white', elevation:8, fontSize:10, textAlign:'center'}}>{notificationCount}</Text>
        </View>
          }
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: 10, padding: 10, elevation: 5, marginHorizontal: 10, borderRadius: 5 }}>
        <View>
          <Text style={{ color: COLORS.black }}>0 New</Text>
          <Text style={{ color: COLORS.black }}>0 Follow Up</Text>
          <Text style={{ color: COLORS.black }}>0 Completed</Text>
        </View>
        <View>
          <Text style={{ color: COLORS.black }}>0 Not Interested</Text>
          <Text style={{ color: COLORS.black }}>0 Not Reachable</Text>
          <Text style={{ color: COLORS.black }}>0 Contacted</Text>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.black }}>0 Read</Text>
          {/* <TouchableOpacity activeOpacity={0.8} style={{ paddingVertical: 10 }} onPress={() => optionSheet.current.show()}>
            <Image source={require('../../images/filter.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', padding: 10 }} />
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 10, marginLeft: 10 }}>All Leads</Text>
      {isLoading ? <ActivityIndicator size={'large'} color={COLORS.orange} style={{flex:1}}/>:
      <FlatList
        data={tempArr}
        style={{flex:1}}
        refreshControl={
          <RefreshControl
            // colors={["#9Bd35A", "#689F38"]}
            colors={[COLORS.orange, COLORS.blue]}
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <View style={{ alignItems:'center',justifyContent:'center', flex:1}}>
        <Text style={{color:COLORS.lightGray}}>No leads avaliable</Text>  
    </View>
        )}
      />}
    
    </>
    )
}

  const actions = [
    {
        text: "Call to PB Executive",
        icon: require("../../images/fabphone.png"),
        name: "call",
        position: 1
    },
    {
        text: "Chat with PB Executive",
        icon: require("../../images/fabmessage.png"),
        name: "message",
        position: 2
    },
];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={{
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 10
      }}>
        <TouchableOpacity onPress={() => {
          navigation.openDrawer()
        }} style={styles.crossImage}>
          <Image source={require('../../images/homemenu.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <Image source={require('../../images/homelogo.png')} style={{ width: 129, height: 40, resizeMode: 'contain' }} />
        <View style={styles.crossImage}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Notification') }} >
            <Image source={require('../../images/homebell.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
          {notificationCount > 0 &&
            <Text style={{ color: 'white', position: 'absolute', top: -2, right: 1, backgroundColor: 'red', borderRadius: 70, paddingHorizontal: 5, elevation:8 }}>{notificationCount}</Text>
          }
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: 10, padding: 10, elevation: 5, marginHorizontal: 10, borderRadius: 5 }}>
        <View>
          <Text style={{ color: COLORS.black }}>{leadData['New'] || 0} New</Text>
          <Text style={{ color: COLORS.black }}>{leadData['Follow Up'] || 0} Follow Up</Text>
          <Text style={{ color: COLORS.black }}>{leadData['Completed'] || 0} Completed</Text>
        </View>
        <View>
          <Text style={{ color: COLORS.black }}>{leadData['Not Interested'] || 0} Not Interested</Text>
          <Text style={{ color: COLORS.black }}>{leadData['Not Reachable'] || 0} Not Reachable</Text>
          <Text style={{ color: COLORS.black }}>{leadData['Contacted'] || 0} Contacted</Text>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={{ color: COLORS.black }}>{leadData['Read'] || 0} Read</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ paddingVertical: 10 }} onPress={() => optionSheet.current.show()}>
            <Image source={require('../../images/filter.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', padding: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 10, marginLeft: 10 }}>All Leads</Text>
      {/* <AllLeads /> */}
      {isLoading ? <ActivityIndicator size={'large'} color={COLORS.orange} style={{flex:1}}/>:
      <FlatList
        data={leadList}
        refreshControl={
          <RefreshControl
            // colors={["#9Bd35A", "#689F38"]}
            colors={[COLORS.orange, COLORS.blue]}
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <View style={{ backgroundColor: '#FFF', paddingVertical: 10, marginBottom: 4, elevation: 2, paddingHorizontal:10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, }}>
              <View style={{width:'45%', marginTop:20,}}>
                <Text style={{ color: COLORS.orange, fontSize: 16, }}>{item.vendor_type}</Text>
                <View style={{}}>
                  <Text style={{ color: COLORS.black, fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>{item.sender}</Text>
                  
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {item.status == 0 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; NEW</Text>
                }
                {item.status == 1 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; FOLLOW UP</Text>
                }
                {item.status == 2 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; COMPLETED</Text>
                }
                {item.status == 3 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; NOT INTERESTED</Text>
                }
                {item.status == 4 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; NOT REACHABLE</Text>
                }
                {item.status == 5 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; CONTACTED</Text>
                }
                {item.status == 6 &&
                  <Text style={{color:'green', fontSize:10, backgroundColor:'#e9ffdb', paddingHorizontal:8, borderRadius:10, paddingVertical:1}}>&#x2022; READ</Text>
                }
                {/* <Text>Status: {item.status == 0 && 'NEW'}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Text style={{ color: COLORS.lightGray }}>{moment(item.created_at).format('hh:mm a')} • </Text>
                  <Text style={{ color: COLORS.lightGray }}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    // openCallModal(index)
                    // alert(JSON.stringify(item,null,2))
                    // return
                    if (item.sender_contact != null) {
                      Linking.openURL(`tel:${item.sender_contact}`)
                    } else {
                      alert('Phone number is not avaliable')
                    }
                  }}>
                    <Image source={require('../../images/call.png')} style={{ width: 38, height: 38, resizeMode: 'contain', marginHorizontal: 5 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => openMessageModal(item, index)}>
                    <Image source={require('../../images/messagebig.png')} style={{ width: 38, height: 38, resizeMode: 'contain', marginHorizontal: 5 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    openOptionModal(item)
                  }}>
                    <Image source={require('../../images/options.png')} style={{ width: 38, height: 38, resizeMode: 'contain', marginLeft: 5 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal:10 , paddingRight:20, marginTop:5}}>
                    <Image source={require('../../images/pin.png')} style={{ resizeMode: 'contain', width: 18, height: 18 }} />
                    <Text numberOfLines={2} style={{fontSize: 12, color: COLORS.lightBlack,   }}>{item.location}</Text>
                  </View>
          </View>
        )}
      />}
      <BottomSheet draggable={false} hasDraggableIcon radius={20} ref={optionSheet} height={400}>
        <ScrollView>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{ color: COLORS.black, marginLeft: 20, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Filter by time:</Text>
            <TouchableOpacity onPress={() => { optionSheet.current.close() }}>
              <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={optionData1}
            style={{}}
            renderItem={({ item, index }) => {
              // const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
              // alert(JSON.stringify(item,null,2))
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  showCalender1(item)
                  // setTT(index)
                  // setOccupation(item)
                  // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                  // setSubCategory('')
                  // setTT2('')
                  // setLeadStatus(index)
                }} style={{ marginHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{}}>
                    <Text style={{ color: COLORS.black, marginLeft: 10 }}>{item.title}</Text>
                    {item.title == 'Custom Date' && <DatePicker
                      style={{width: width - 40, height:38}}
                      customButton = {customButton}
                      blockAfter={true}
                      customStyles={{
                        placeholderText: { fontSize: 20 }, // placeHolder style
                        headerStyle: {},			// title container style
                        headerMarkTitle: {}, // title mark style 
                        headerDateTitle: {}, // title Date style
                        contentInput: {}, //content text container style
                        contentText: {color:'black'}, //after selected text Style
                      }} // optional 
                      centerAlign // optional text will align center or not
                      allowFontScaling={false} // optional
                      placeholder={'Pick your dates'}
                      mode={'range'}
                      onConfirm={(value)=>{
                        optionSheet.current.close()
                        navigation.navigate('FilterLeads',{value,item, optionData})
                      }}
                    />}
                  </View>
                  {/* {tt == index ? <Image style={{ height: 20, width: 20 }} source={require('../../images/done.png')} /> : null} */}
                </TouchableOpacity>
              )
            }} />
        <Text style={{ color: COLORS.black, marginLeft: 20, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Filter by category:</Text>
        <FlatList
            data={optionData}
            style={{}}
            renderItem={({ item, index }) => {
              // const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
              // alert(JSON.stringify(item,null,2))
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  showCalender(item)
                  // setTT(index)
                  // setOccupation(item)
                  // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                  // setSubCategory('')
                  // setTT2('')
                  // setLeadStatus(index)
                }} style={{ marginHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{}}>
                    <Text style={{ color: COLORS.black, marginLeft: 10 }}>{item.title}</Text>
                  </View>
                  {/* {tt == index ? <Image style={{ height: 20, width: 20 }} source={require('../../images/done.png')} /> : null} */}
                </TouchableOpacity>
              )
            }} />
        </ScrollView>
        {/* <TouchableOpacity onPress={()=> {updateLead()}}  style={{width:'80%', alignSelf:'center',  marginVertical:8}}>
          <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:12, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
        </TouchableOpacity> */}
      </BottomSheet>
      <BottomSheet draggable={false} hasDraggableIcon  radius={20} ref={optionSheetforoption} height={400}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{color:COLORS.black, marginLeft:20, fontSize:18, fontWeight:'bold', marginBottom:10}}>Options</Text>
            <TouchableOpacity onPress={() => { optionSheetforoption.current.close() }}>
              <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
            </TouchableOpacity>
          </View>
        <ScrollView>
          <FlatList
            data={optionData}
            style={{ }}
            renderItem={({ item, index }) => {
              // const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
              // alert(JSON.stringify(item,null,2))
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                  setTT(index)
                  // setOccupation(item)
                  // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                  // setSubCategory('')
                  // setTT2('')
                  setLeadStatus(index)
                }} style={{ marginHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: COLORS.black, marginLeft: 10 }}>{item.title}</Text>
                  </View>
                  {tt == index ? <Image style={{ height: 20, width: 20 }} source={require('../../images/done.png')} /> : null}
                </TouchableOpacity>
              )
            }} />
        </ScrollView>
        <TouchableOpacity onPress={()=> {updateLead()}}  style={{width:'80%', alignSelf:'center',  marginVertical:8}}>
          <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:12, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
        </TouchableOpacity>
      </BottomSheet>
      <Modal
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <TouchableOpacity onPressOut={() => setModalOpen(false)} style={styles.modal_View}>
          <View activeOpacity={0.8} style={styles.modelMainBox}>
            <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10, marginTop: 10, }}>Message via</Text>
            <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 5, borderBottomColor: 'lightgray', borderBottomWidth: 0.5 }}></Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setModalOpen(false)
              navigation.navigate('PersonalChat', { userDetail, client: leadList[modalIndex] })
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmsg.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              if (leadList[modalIndex].sender_contact != null) {
                if (leadList[modalIndex].sender_contact.startsWith('+91')) {
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=${leadList[modalIndex].sender_contact}`)
                } else {
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=+91${leadList[modalIndex].sender_contact}`)
                }
              }
              alert('Phone number is not avaliable')
              setModalOpen(false)
              // setModalOpen(false)
              // Linking.openURL(`whatsapp://send?text=Hello&phone=${leadList[modalIndex].sender_contact}`)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Whats App</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setModalOpen(false)
              Linking.openURL(`sms:${leadList[modalIndex].sender_contact}?body=`)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmail.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Text Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <FloatingAction
        color={COLORS.blue}
        position='right'
        floatingIcon={require('../../images/fabicon.png')}
        iconWidth={30}
        buttonSize={60}
        iconHeight={30}
        actions={actions}
        onPressItem={name => {
          if (name == 'message') {
            navigation.navigate("AdminChat")
          } else {
            navigation.navigate('ExecutivesNumber')
          }
        }}
      />
    </SafeAreaView>
  )
}

export default Leads

const styles = StyleSheet.create({
  crossImage: {
    marginLeft: 20,
    alignItems: 'center',
    marginRight: 20,
    width: '10%',
    padding: 5,
    // backgroundColor: '#FFF',
    borderRadius: 10
  },
  // modal_View: {
  //   // backgroundColor: 'yellow',
  //   backgroundColor: '#000000aa',
  //   flex: 1,
  //   // height:200
  // },
  // modelMainBox: {
  //   padding:10,
  //   // backgroundColor: 'red',
  //   backgroundColor: '#FFFFFF',
  //   marginTop: height / 3,
  //   marginHorizontal: 20,
  //   borderRadius: 20,
  //   height:350
  // },
  // text: {
  //   fontFamily: 'Muli-Bold',
  //   fontWeight: 'bold',
  //   fontSize: 18,
  //   color: '#1E1F20',
  //   textAlign: 'center',
  //   marginTop: 10,
  //   lineHeight: 25,
  // },
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