import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React,{useState} from 'react'
import { COLORS } from '../../Constant/Colors'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
const {height} = Dimensions.get('window');
const ThisWeekLeads = (props) => {
    const navigation = useNavigation()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [modalIndex, setModalIndex] = useState('');

    const openCallModal = (index) => {
        setModalIndex(index)
        setModalOpen1(true)
    }
    const openMessageModal = (item,index) => {
        // setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    const openOptionModal = (item,index) => {
        // setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    if(props.weekData.length == '0'){
        return (
        <View style={{ alignItems:'center',}}>
            <Text style={{color:COLORS.lightGray}}>No leads avaliable for this week</Text>  
        </View>)
    }
  return (
      <View>
          <FlatList
              data={props.weekData}
              renderItem={({ item, index }) => (
                  <View style={{ backgroundColor: '#FFF', paddingVertical: 10, marginBottom: 4 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, }}>
                          <Text style={{ color: COLORS.orange, fontSize: 16 }}>{item.vendor_type}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:MMa')} • </Text>
                              <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('DD MMM YYYY')}</Text>
                          </View>
                      </View>
                      <Text style={{ marginLeft: 20, paddingVertical: 10 ,color:COLORS.lightGray}}>{item.message}</Text>
                      <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                              <Image source={require('../../images/avatar1.png')} style={{ width: 46, height: 46, resizeMode: 'contain' }} />
                              <View style={{ marginLeft: 10 }}>
                                  <Text style={{ color: COLORS.black, fontSize: 16, marginBottom: 5 }}>{item.sender}</Text>
                                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                      <Image source={require('../../images/graylocation.png')} style={{ resizeMode: 'contain', width: 18, height: 18 }} /><Text style={{color:COLORS.lightGray}}> {item.distance}</Text>
                                  </View>
                              </View>
                          </View>
                          <View style={{ flexDirection: 'row', }}>
                              <TouchableOpacity onPress={() => openCallModal(item)}>
                                  <Image source={require('../../images/call.png')} style={{ width: 46, height: 46, resizeMode: 'contain', marginHorizontal: 5 }} />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => openMessageModal(item, index)}>
                                  <Image source={require('../../images/messagebig.png')} style={{ width: 46, height: 46, resizeMode: 'contain', marginHorizontal: 5 }} />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => openOptionModal(item, index)}>
                                  <Image source={require('../../images/options.png')} style={{ width: 46, height: 46, resizeMode: 'contain', marginHorizontal: 5 }} />
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
                      <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 20, marginLeft: 10, marginTop: 10 }}>Message via</Text>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   navigation.navigate('PersonalChat',{userDetail, client:newData[modalIndex]})
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/modalmsg.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Chat</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   Linking.openURL(`whatsapp://send?text=hello&phone=${newData[modalIndex].contact_number}`)
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Whats App</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   Linking.openURL(`sms:${newData[modalIndex].contact_number}?body=yourMessage`)
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/modalmail.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Text Message</Text>
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
                      <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 20, marginLeft: 10, marginTop: 10 }}>Call via</Text>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/dialerbig.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Phone Dialer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   navigation.navigate('DialedCallScreen')
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/callbig.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Internet Call</Text>
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
                      <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 20, marginLeft: 10, marginTop: 10 }}>Call via</Text>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   Linking.openURL(`tel:${newData[modalIndex].contact_number}`)
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/dialerbig.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Phone Dialer</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          setModalOpen(false)
                          //   navigation.navigate('DialedCallScreen')
                      }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                          <Image source={require('../../images/callbig.png')} style={{ width: 40, height: 40 }} />
                          <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Internet Call</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
      </View> 
  )
}

export default ThisWeekLeads

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