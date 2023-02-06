import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, Button, Linking, Modal, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import { COLORS } from '../../Constant/Colors'
import moment from 'moment'
import BottomSheet from "react-native-gesture-bottom-sheet";
const { height, width } = Dimensions.get('window');
import DatePicker from 'react-native-date-ranges';
import { async } from '@firebase/util'

const FilterLeads = ({ navigation, route }) => {
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
  const optionSheet = useRef();
  const optionSheettoChangeStatus = useRef();
  // alert(JSON.stringify(route.params,null,2))
  const [leadData, setLeadData] = useState([])
  const [toUpdateScreen, setToUpdateScreen] = useState(1)
  const [tt, setTT] = useState();
  const [leadStatus, setLeadStatus] = useState();
  const [ttStatus, setTTStatus] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState('');
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [modalOpen2, setModalOpen2] = useState(false);
  
  useEffect(() => {
    if(route.params.hasOwnProperty('optionData')){
      // alert('optionData')
      getPlanHistory()
    }else{
      // alert('optionData1')
      getPlanHistoryForCategory()
    }
  }, [updateLeadForStatus])

  let startDate;
  let endDate;
  const getPlanHistory = async () => {
    // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/6060?from_date=${route.params.value?.startDate}&to_date=${route.params.value?.endDate}`))
    // alert(JSON.stringify(moment(new Date).format('DD-MM-YYYY')))
    // alert()
    // alert(JSON.stringify(route.params.item.title,null,2))
    if (route.params.item.title == 'Today') {
      // setIsLoading(true)
      startDate = moment(new Date).format('YYYY-MM-DD')
      endDate = moment(new Date).format('YYYY-MM-DD')
      // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/6060?from_date=${startDate}&to_date=${endDate}`))
      const token = (await LocalStorage.getToken() || '')
      const user = (await LocalStorage.getUserDetail() || '')
      const newUser = JSON.parse(user)
      setUser(newUser)
      const btoken = `Bearer ${token}`;
      const response = await fetch(`${BASE_URL}all-vendor-lead/${newUser.id}?from_date=${startDate}&to_date=${endDate}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      // alert(JSON.stringify(res,null,2))
      // setIsLoading(false)
      setLeadData(res.data.data)
    } else {
      // alert(JSON.stringify(route.params.value,null,2))
      // setIsLoading(true)
      const token = (await LocalStorage.getToken() || '')
      const user = (await LocalStorage.getUserDetail() || '')
      const newUser = JSON.parse(user)
      setUser(newUser)
      const btoken = `Bearer ${token}`;
      // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/6060?from_date=${route.params.value?.startDate}&to_date=${route.params.value?.endDate}&status=${route.params?.item?.id}`))
      const response = await fetch(`${BASE_URL}all-vendor-lead/${newUser.id}?from_date=${route.params.value?.startDate}&to_date=${route.params.value?.endDate}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      // alert(JSON.stringify(res,null,2))
      // setIsLoading(false)
      setLeadData(res.data.data)
    }
  }

  const getPlanHistoryForCategory = async() => {
    // alert('category wise filter')
    setIsLoading(true)
    const token = (await LocalStorage.getToken() || '')
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    setUser(newUser)
    const btoken = `Bearer ${token}`;
    // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/${newUser.id}?status=${route.params.item.id}`,null,2))
    const response = await fetch(`${BASE_URL}all-vendor-lead/${newUser.id}?status=${route.params.item.id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    const {success, data} = res;
    if(success){
      // alert(JSON.stringify(res,null,2))
      setIsLoading(false)
      setLeadData(data.data.reverse())
    }
  }

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
      // setTT(index.status)
      setTTStatus(index.status)
      setModalIndex(index)
      optionSheettoChangeStatus.current.show()
  }

  const showCalender = async (item, value) => {
    // alert(JSON.stringify(item,null,2))
    // return
    if (item.id == 10 || item.id == 11) {
      // alert(JSON.stringify(route.params,null,2))
      optionSheet.current.close()
      const token = (await LocalStorage.getToken() || '')
      const btoken = `Bearer ${token}`;
      // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/${user.id}?from_date=${item.id == 10 ? moment(new Date).format('YYYY-MM-DD'): value?.startDate}&to_date=${item.id == 10 ? moment(new Date).format('YYYY-MM-DD') : value?.endDate}&status=${item.id}`,null,2))
      const response = await fetch(`${BASE_URL}all-vendor-lead/${user.id}?from_date=${item.id == 10 ? moment(new Date).format('YYYY-MM-DD'): value?.startDate}&to_date=${item.id == 10 ? moment(new Date).format('YYYY-MM-DD') : value?.endDate}&status=${route.params.item.id}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      // alert(JSON.stringify(res,null,2))
      setLeadData(res.data.data)
    } else {
      // alert(JSON.stringify(item,null,2))
      optionSheet.current.close()
      const token = (await LocalStorage.getToken() || '')
      const btoken = `Bearer ${token}`;
      startDate = moment(new Date).format('YYYY-MM-DD')
      endDate = moment(new Date).format('YYYY-MM-DD')
      // alert(JSON.stringify(`${BASE_URL}all-vendor-lead/${user.id}?from_date=${startDate}&to_date=${endDate}&status=${item.id}`,null,2))
      // return
      const response = await fetch(`${BASE_URL}all-vendor-lead/${user.id}?from_date=${startDate}&to_date=${endDate}&status=${item.id}`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      setLeadData(res.data.data)
    }
  }

  const updateLeadForStatus = async(item) => {
    optionSheettoChangeStatus.current.close()
    // setIsLoading(true)
    const user = (await LocalStorage.getUserDetail() || '')
    const token = (await LocalStorage.getToken() || '')
    const newUser = JSON.parse(user)
    const btoken = `Bearer ${token}`;
    // alert(JSON.stringify(`${BASE_URL}update-lead/${modalIndex.id}/${leadStatus}`,null,2))
    // return
    const response = await fetch(`${BASE_URL}update-lead/${modalIndex.id}/${leadStatus}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    // alert(JSON.stringify(res,null,2))
    if(route.params.hasOwnProperty('optionData')){
      // alert('if')

      getPlanHistoryForCategory()
    }else{
      // alert('else')
      // alert('optionData1')
      getPlanHistoryForCategory()
    }
    // setToUpdateScreen(toUpdateScreen + 1)
    // setIsLoading(false)
    // getPlanHistory()
    // getPlanHistoryForCategory()
  }

  const customButton = (onConfirm) => (
    <Button
      onPress={onConfirm}
      style={{ backgroundColor: 'red', container: { width: '100%', marginHorizontal: '3%' }, text: { fontSize: 22 } }}
      // primary
      title='Select'
    />)

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
            <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
          <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 20, marginLeft: 10, fontWeight: '600' }}>Filter </Text>
          <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 20, fontWeight: '600' }}>Results</Text>
        </View>
        <TouchableOpacity style={{}} onPress={() => { optionSheet.current.show() }}>
          <Image source={require('../../images/filter.png')} style={{ width: 24, height: 24, }} />
        </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size={'large'} color={COLORS.orange}/> :
      <FlatList
        data={leadData}
        renderItem={({ item, index }) => (
          <View style={{ backgroundColor: '#FFF', paddingVertical: 10, marginBottom: 4, elevation: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, }}>
              <View style={{}}>
                <Text style={{ color: COLORS.orange, fontSize: 16, }}>{item.vendor_type}</Text>
                <View style={{}}>
                  <Text style={{ color: COLORS.black, fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>{item.sender}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../images/graylocation.png')} style={{ resizeMode: 'contain', width: 18, height: 18 }} /><Text style={{ color: COLORS.lightGray }}> {item.distance}</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
              {item.status == 0 &&
                  <Text style={{color:'blue'}}>NEW</Text>
                }
                {item.status == 1 &&
                  <Text style={{color:'yellow'}}>FOLLOW UP</Text>
                }
                {item.status == 2 &&
                  <Text style={{color:'green'}}>COMPLETED</Text>
                }
                {item.status == 3 &&
                  <Text style={{color:'red'}}>NOT INTERESTED</Text>
                }
                {item.status == 4 &&
                  <Text style={{color:'darkgreen'}}>NOT REACHABLE</Text>
                }
                {item.status == 5 &&
                  <Text style={{color:'orange'}}>CONTACTED</Text>
                }
                {item.status == 6 &&
                  <Text style={{color:'lightblue'}}>READ</Text>
                }
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
                  <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    openMessageModal(item, index)
                  }}>
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
          </View>
        )}
      />}
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
              navigation.navigate('PersonalChat', { userDetail, client: leadData[modalIndex] })
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmsg.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              if (leadData[modalIndex].sender_contact != null) {
                if (leadData[modalIndex].sender_contact.startsWith('+91')) {
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=${leadData[modalIndex].sender_contact}`)
                } else {
                  setModalOpen(false)
                  Linking.openURL(`whatsapp://send?text=&phone=+91${leadData[modalIndex].sender_contact}`)
                }
              }
              alert('Phone number is not avaliable')
              setModalOpen(false)
              // setModalOpen(false)
              // Linking.openURL(`whatsapp://send?text=Hello&phone=${leadData[modalIndex].sender_contact}`)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Whats App</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {
              setModalOpen(false)
              Linking.openURL(`sms:${leadData[modalIndex].sender_contact}?body=`)
            }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
              <Image source={require('../../images/modalmail.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Text Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <BottomSheet draggable={false} hasDraggableIcon radius={20} ref={optionSheet} height={400}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{ color: COLORS.black, marginLeft: 20, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Filter</Text>
            <TouchableOpacity onPress={() => { optionSheet.current.close() }}>
              <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
            </TouchableOpacity>
          </View>
        <ScrollView>
          <FlatList
            data={route.params.optionData1 || route.params.optionData}
            style={{}}
            renderItem={({ item, index }) => {
              // const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
              // alert(JSON.stringify(item,null,2))
              return (
                <>
                  {item.title != route.params.item.title &&
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        showCalender(item)
                      setTT(index)
                      // setOccupation(item)
                      // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                      // setSubCategory('')
                      // setTT2('')
                      // setLeadStatus(index)
                    }} style={{ marginHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                      <View style={{}}>
                        <Text style={{ color: COLORS.black, marginLeft: 10 }}>{item.title}</Text>
                        {item.title == 'Custom Date' && <DatePicker
                          style={{ width: width - 40, height: 38 }}
                          customButton={customButton}
                          blockAfter={true}
                          customStyles={{
                            placeholderText: { fontSize: 20 }, // placeHolder style
                            headerStyle: {},			// title container style
                            headerMarkTitle: {}, // title mark style 
                            headerDateTitle: {}, // title Date style
                            contentInput: {}, //content text container style
                            contentText: { color: 'black' }, //after selected text Style
                          }} // optional 
                          centerAlign // optional text will align center or not
                          allowFontScaling={false} // optional
                          placeholder={'Pick your dates'}
                          mode={'range'}
                          onConfirm={(value) => {
                            showCalender(item,value)
                            // optionSheet.current.close()
                            // navigation.navigate('FilterLeads',value)
                            // alert(JSON.stringify(value,null,2))
                          }}
                        />}
                      </View>
                      {tt == index ? <Image style={{ height: 18, width: 18, resizeMode:'contain' }} source={require('../../images/done.png')} /> : null}
                    </TouchableOpacity>}
                </>
              )
            }} />
        </ScrollView>
        {/* <TouchableOpacity onPress={()=> {updateLead()}}  style={{width:'80%', alignSelf:'center',  marginVertical:8}}>
          <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:12, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
        </TouchableOpacity> */}
      </BottomSheet>
      <BottomSheet draggable={false} hasDraggableIcon radius={20} ref={optionSheettoChangeStatus} height={400}>
        <Text style={{ color: COLORS.black, marginLeft: 20, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Options</Text>
        <ScrollView>
          <FlatList
            data={optionData}
            style={{}}
            renderItem={({ item, index }) => {
              // const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
              // alert(JSON.stringify(item,null,2))
              return (
                <>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                      setLeadStatus(index)
                      setTTStatus(index)
                        // updateLeadForStatus(item)
                      // setOccupation(item)
                      // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                      // setSubCategory('')
                      // setTT2('')
                    }} style={{ marginHorizontal: 20, paddingVertical: 14, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                      <View style={{}}>
                        <Text style={{ color: COLORS.black, marginLeft: 10 }}>{item.title}</Text>
                      </View>
                      {ttStatus == index ? <Image style={{ height: 18, width: 18, resizeMode:'contain' }} source={require('../../images/done.png')} /> : null}
                    </TouchableOpacity>
                </>
              )
            }} />
        </ScrollView>
        <TouchableOpacity onPress={()=> {updateLeadForStatus()}}  style={{width:'80%', alignSelf:'center',  marginVertical:8}}>
          <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:12, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  )
}

export default FilterLeads

const styles = StyleSheet.create({
  crossImage: {
    // marginLeft: 20,
    // width: '10%',
    padding: 5,
    // backgroundColor:'red'
    padding: 5,
    // backgroundColor: '#FFF',
    borderRadius: 10
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