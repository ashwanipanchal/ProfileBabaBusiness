import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions,ScrollView, Linking } from 'react-native'
import React,{useState, useRef} from 'react'
import { COLORS } from '../../Constant/Colors'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import Dialog from "react-native-dialog";
import BottomSheet from "react-native-gesture-bottom-sheet";
const {height} = Dimensions.get('window');
const AllLeads = (props) => {
    const optionSheet = useRef();
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalIndex, setModalIndex] = useState('');
    const [userDetail, setUserDetail] = useState();
    const [visible, setVisible] = useState(false);
    const [tt, setTT] = useState();
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
        title: 'Completed',
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
      alert(JSON.stringify(item,null,2))
        setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    const openOptionModal = (index) => {
        // alert(JSON.stringify(index,null,2))
        // setUserDetail(item)
        setModalIndex(index)
        optionSheet.current.show()
    }
    if(props.leadData.length == '0'){
        return (
        <View style={{ alignItems:'center',}}>
            <Text style={{color:COLORS.lightGray}}>No leads avaliable</Text>  
        </View>)
    }
    const showDialog = () => {
      setVisible(true);
    };
    const handleCancel = () => {
      setVisible(false);
    };
  return (
    <View>
        <FlatList
        data={props.leadData}
        renderItem={({item, index})=> (
            <View style={{backgroundColor:'#FFF', paddingVertical:10, marginBottom:4}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20, }}>
                    <Text style={{color:COLORS.orange, fontSize:16,}}>{item.vendor_type}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>   
                        <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:MMa')} • </Text>
                        <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                    </View>
                </View>
                <Text style={{marginLeft:20, paddingVertical:3,color:COLORS.lightGray,}}>{item.message}</Text>
                <View style={{flexDirection:'row', marginHorizontal:20, justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Image source={require('../../images/avatar1.png')} style={{width:46, height:46, resizeMode:'contain'}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{color:COLORS.black, fontSize:16,marginBottom:5}}>{item.sender}</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={require('../../images/graylocation.png')} style={{resizeMode:'contain', width:18, height:18}}/><Text style={{color:COLORS.lightGray}}> {item.distance}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',}}>
                        <TouchableOpacity onPress={()=>openCallModal(index)}>
                            <Image source={require('../../images/call.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>openMessageModal(item,index)}>
                            <Image source={require('../../images/messagebig.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          openOptionModal(index)
                          }}>
                            <Image source={require('../../images/options.png')} style={{width:46, height:46, resizeMode:'contain',marginHorizontal:5}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )}
    />
        <Modal
                visible={modalOpen}
                transparent={true}
                onRequestClose={() => setModalOpen(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Message via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          navigation.navigate('PersonalChat',{userDetail, client:props.leadData[modalIndex]})
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/modalmsg.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {
                          setModalOpen(false)
                          Linking.openURL(`whatsapp://send?text=hello&phone=${props.leadData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/modalwhatsapp.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Whats App</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`sms:${props.leadData[modalIndex].contact_number}?body=yourMessage`)
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
                // key={newData.index}
                onRequestClose={() => setModalOpen1(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Call via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          Linking.openURL(`tel:${props.leadData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                          // navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={modalOpen2}
                transparent={true}
                // key={newData.index}
                onRequestClose={() => setModalOpen2(false)}>
                <View style={styles.modal_View}>
                    <View activeOpacity={0.8} style={styles.modelMainBox}>
                        <Text style={{color:COLORS.black, fontSize:18, marginBottom:20,marginLeft:10 , marginTop:10}}>Call via</Text>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                        //   Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                          }} style={{flexDirection:'row', marginVertical:15, alignItems:'center',marginLeft:10 }}>
                            <Image source={require('../../images/dialerbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Phone Dialer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                          setModalOpen(false)
                        //   navigation.navigate('DialedCallScreen')
                        }} style={{flexDirection:'row',marginVertical:15,alignItems:'center',marginLeft:10}}>
                            <Image source={require('../../images/callbig.png')} style={{width:40, height:40}}/>
                            <Text style={{color:COLORS.black, fontSize:18, marginLeft:10}}>Internet Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

      <BottomSheet draggable={false} hasDraggableIcon  radius={20} ref={optionSheet} height={500}>
        <ScrollView>
          <FlatList
            data={optionData}
            style={{marginTop:20 }}
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
                  optionSheet.current.close()
                }} style={{ marginHorizontal: 20, paddingVertical: 20, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
                  </View>
                  {tt == index ? <Image style={{ height: 22, width: 22 }} source={require('../../images/done.png')} /> : null}
                </TouchableOpacity>
              )
            }} />
        </ScrollView>
      </BottomSheet>
    </View> 
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