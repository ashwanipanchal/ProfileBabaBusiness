import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions,ScrollView, Linking, ActivityIndicator,  RefreshControl } from 'react-native'
import React,{useState, useRef,useEffect} from 'react'
import { COLORS } from '../../Constant/Colors'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import Dialog from "react-native-dialog";
import BottomSheet from "react-native-gesture-bottom-sheet";
import { LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import Loader from '../../services/Loader'
const {height} = Dimensions.get('window');
const AllLeads = () => {
  // alert(JSON.stringify(leadData,null,2))
    const optionSheet = useRef();
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalIndex, setModalIndex] = useState('');
    const [userDetail, setUserDetail] = useState();
    const [leadData, setLeadData] = useState([])
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [leadStatus, setLeadStatus] = useState();
    const [tt, setTT] = useState();
    const [uniqueValue, setUniqueValue] = useState(1);

    useEffect(()=> {
      getPlanHistory()
    },[])

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() =>{
        // alert("HI")
        // getUserNotification()
        getPlanHistory()
        setRefreshing(false)});
      }, []);
      
      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
    const getPlanHistory = async() => {
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
      setLeadData(res.data.data.reverse())
      // let weekdata = res.data.map((item)=>{
      //   var now = moment();
      //   var input = moment(item.created_at);
      //   if(now.isoWeek() == input.isoWeek()){
      //     return item
      //   }
      // })

      // weekdata = weekdata.filter(x => x != null)
      // setWeekData(weekdata)
    }

    const optionData = [
      {
        title: 'New',
        id:0
      },
      {
        title: 'Follow Up',
        id:1
      },
      {
        title: 'Completed',
        id:2
      },
      {
        title: 'Not Interested',
        id:3
      },
      {
        title: 'Not Reachable',
        id:4
      },
      {
        title: 'Contacted',
        id:5
      },
      {
        title: 'Read',
        id:6
      },
    ]
    const openCallModal = (index) => {
        setModalIndex(index)
        setModalOpen1(true)
        setVisible(true)
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
        setTT(index.status)
        setModalIndex(index)
        optionSheet.current.show()
    }
    if(!isLoading && leadData.length == '0' ){
        return (
        <View style={{ alignItems:'center',}}>
            <Text style={{color:COLORS.lightGray}}>No leads avaliable</Text>  
        </View>)
    }

    const updateLead = async() => {
      // alert(JSON.stringify(modalIndex.id, null, 2))
      optionSheet.current.close()
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

  return (
    <ScrollView>
      {isLoading && <ActivityIndicator size={'large'} color={COLORS.orange}/>}
        <FlatList
        data={leadData}
        refreshControl={
          <RefreshControl
            // colors={["#9Bd35A", "#689F38"]}
            colors={[COLORS.orange, COLORS.blue]}
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }
        renderItem={({item, index})=> (
            // <View style={{backgroundColor:'#FFF', paddingVertical:10, marginBottom:4}}>
            //     <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, }}>
            //         <Text style={{color:COLORS.orange, fontSize:16,}}>{item.vendor_type}</Text>
            //         <View style={{flexDirection:'row', alignItems:'center'}}>   
            //             <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:mm a')} • </Text>
            //             <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
            //         </View>
            //     </View>
            //     <Text style={{marginLeft:20, paddingVertical:3,color:COLORS.lightGray,}}>{item.message}</Text>
            //     <View style={{flexDirection:'row',marginHorizontal:10, justifyContent:'space-between',width:'100%', backgroundColor:'yellow'}}>
            //         <View style={{flexDirection:'row', alignItems:'center',}}>
            //             {/* <Image source={require('../../images/avatar1.png')} style={{width:46, height:46, resizeMode:'contain'}}/> */}
            //             <View style={{marginLeft:10,width:'55%',}}>
            //                 <Text style={{color:COLORS.black, fontSize:16,marginBottom:5, fontWeight:'bold' }}>{item.sender}</Text>
            //                 <View style={{flexDirection:'row', alignItems:'center'}}>
            //                     <Image source={require('../../images/graylocation.png')} style={{resizeMode:'contain', width:18, height:18}}/><Text style={{color:COLORS.lightGray}}> {item.distance}</Text>
            //                 </View>
            //             </View>
            //         </View>
            //         <View style={{flexDirection:'row',  backgroundColor:'red' }}>
            //             <TouchableOpacity activeOpacity={0.8} onPress={()=> {
            //               // openCallModal(index)
            //               // alert(JSON.stringify(item,null,2))
            //               // return
            //               if(item.sender_contact != null){
            //                 Linking.openURL(`tel:${item.sender_contact}`)
            //               }else{
            //                 alert('Phone number is not avaliable')
            //               }
            //             }}>
            //                 <Image source={require('../../images/call.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
            //             </TouchableOpacity>
            //             <TouchableOpacity activeOpacity={0.8} onPress={()=>openMessageModal(item,index)}>
            //                 <Image source={require('../../images/messagebig.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
            //             </TouchableOpacity>
            //             <TouchableOpacity activeOpacity={0.8} onPress={()=>{
            //               openOptionModal(item)
            //               }}>
            //                 <Image source={require('../../images/options.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
            //             </TouchableOpacity>
            //         </View>
            //     </View>
            // </View>
            <View style={{backgroundColor:'#FFF', paddingVertical:10, marginBottom:4,elevation:2}}>
              <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, }}>
                <View style={{}}>
                  <Text style={{color:COLORS.orange, fontSize:16,}}>{item.vendor_type}</Text>
                  <View style={{}}>
                             <Text style={{color:COLORS.black, fontSize:16,marginBottom:5, fontWeight:'bold' }}>{item.sender}</Text>
                             <View style={{flexDirection:'row', alignItems:'center'}}>
                                 <Image source={require('../../images/graylocation.png')} style={{resizeMode:'contain', width:18, height:18}}/><Text style={{color:COLORS.lightGray}}> {item.distance}</Text>
                             </View>
                         </View>
                </View>
                <View style={{alignItems:'flex-end'}}>
                  <View style={{flexDirection:'row', alignItems:'center',marginBottom:10}}>   
                    <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:mm a')} • </Text>
                    <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                  </View>
                  <View style={{flexDirection:'row',  }}>
                         <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                           // openCallModal(index)
                           // alert(JSON.stringify(item,null,2))
                           // return
                           if(item.sender_contact != null){
                             Linking.openURL(`tel:${item.sender_contact}`)
                           }else{
                             alert('Phone number is not avaliable')
                           }
                         }}>
                             <Image source={require('../../images/call.png')} style={{width:38, height:38, resizeMode:'contain',marginHorizontal:5}}/>
                         </TouchableOpacity>
                         <TouchableOpacity activeOpacity={0.8} onPress={()=>openMessageModal(item,index)}>
                             <Image source={require('../../images/messagebig.png')} style={{width:38, height:38, resizeMode:'contain',marginHorizontal:5}}/>
                        </TouchableOpacity>
                         <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                           openOptionModal(item)
                           }}>
                             <Image source={require('../../images/options.png')} style={{width:38, height:38, resizeMode:'contain',marginLeft:5}}/>
                         </TouchableOpacity>
                     </View>
                </View>
                </View>
            </View>
        )}
    />
        <Modal
                visible={modalOpen}
                transparent={true}
                onRequestClose={() => setModalOpen(false)}>
                <TouchableOpacity onPressOut={()=>setModalOpen(false)} style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                    <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 10, marginTop: 10, }}>Message via</Text>
                    <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 5,  borderBottomColor:'lightgray', borderBottomWidth:0.5 }}></Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('PersonalChat',{userDetail, client:leadData[modalIndex]})
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/modalmsg.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=> {
                          if(leadData[modalIndex].sender_contact != null){
                            if(leadData[modalIndex].sender_contact.startsWith('+91')){
                              setModalOpen(false)
                              Linking.openURL(`whatsapp://send?text=&phone=${leadData[modalIndex].sender_contact}`)
                            }else{
                              setModalOpen(false)
                              Linking.openURL(`whatsapp://send?text=&phone=+91${leadData[modalIndex].sender_contact}`)
                            }
                          }
                          alert('Phone number is not avaliable')
                          setModalOpen(false)
                          // setModalOpen(false)
                          // Linking.openURL(`whatsapp://send?text=Hello&phone=${leadData[modalIndex].sender_contact}`)
                          }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Whats App</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`sms:${leadData[modalIndex].sender_contact}?body=`)
                          }} style={{flexDirection:'row', marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalmail.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Text Message</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                visible={modalOpen1}
                transparent={true}
                statusBarTranslucent
                // key={newData.index}
                onRequestClose={() => setModalOpen1(false)}>
                <TouchableOpacity onPressOut={()=>setModalOpen1(false)} style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                    <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 10, marginTop: 10, }}>Call via</Text>
            <Text style={{ color: COLORS.black, fontSize: 18,  marginLeft: 5,  borderBottomColor:'lightgray', borderBottomWidth:0.5 }}></Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`tel:${leadData[modalIndex].sender_contact}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                          setModalOpen(false)
                          // navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity> */}
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                visible={modalOpen2}
                transparent={true}
                statusBarTranslucent
                // key={newData.index}
                onRequestClose={() => setModalOpen2(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Call via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                        //   Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                        //   navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{ width: 32, height: 32 }}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

      <BottomSheet draggable={false} hasDraggableIcon  radius={20} ref={optionSheet} height={400}>
        <Text style={{color:COLORS.black, marginLeft:20, fontSize:18, fontWeight:'bold', marginBottom:10}}>Options</Text>
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
    </ScrollView> 
  )
}

export default AllLeads

const styles = StyleSheet.create({
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