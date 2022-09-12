import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../../Constant/Colors'
import { useEffect,useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { LocalStorage } from '../../services/Api'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-simple-toast';

const PersonalChat = ({navigation,route}) => {
  const [messages, setMessages] = useState([]);
  const [EachMessages, setEachMessages] = useState('');
  const [userID, setUserID] = useState();
  useEffect(()=>{
    getUser()
    alert(JSON.stringify(route.params,null,2))
  },[])

  useEffect(() => {
    if(userID) {
      getUserChat()
    }
  }, [userID])

  const getUser = async () => {
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    setUserID(newUser.id)
  }
  const getUserChat = async() => {
    const docId = route.params.userDetail.vendor_id > userID ? userID+"-"+ route.params.userDetail.vendor_id : route.params.userDetail.vendor_id+"-"+userID 
    // alert(docId)
    const ruffchats = await firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt','asc').get()
      const chats = ruffchats.docs.map((item)=> {
        return {
          ...item.data(),
          createdAt:item.data().createAt.toDate()
        }
      })
      console.log(chats)
      setMessages(chats) 
  }

  const sendMessage = async() => {
    if(!EachMessages){
      Toast.show("Write your message")
      return
    }
    const msg = {
      'message' : EachMessages,
      'sendBy' :  userID,
      'sendTo': route.params.userDetail.vendor_id,
      'createdAt' : new Date()
    }
    setMessages(prevState => [...prevState, msg])
    const docId = route.params.userDetail.vendor_id > userID ? userID+"-"+ route.params.userDetail.vendor_id : route.params.userDetail.vendor_id+"-"+userID 
    firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
    setEachMessages('')
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: StatusBar.currentHeight, alignItems: 'center' , width:'100%'}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{color:COLORS.orange, fontSize:20, fontWeight:'700', width:'50%', textAlign:'center', marginRight:'auto'}}><Text style={{color:COLORS.blue}}>Chat</Text> with {route.params.userDetail.sender}</Text>
          </View>
          <ScrollView>
          <FlatList
              data={messages}
              renderItem={({item})=> (
                <View>
                  {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
                  {/* <View>
                    <Text style={{color:'black'}}>{item.date}</Text>
                  </View> */}
                  {item.sendBy === userID?
                    (
                      <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
                        <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
                        {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.createAt}</Text> */}
                      </View>
                    ) :
                    (
                      <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
                        <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
                        {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.createdAt}</Text> */}
                      </View>
                    )
                  }  
                </View>
              )}
            />
          </ScrollView>
          <View style={{ flexDirection: 'row', marginVertical:10, marginHorizontal:10, }}>
            <TextInput
             style={styles.textInput}
             value={EachMessages}
              onChangeText={text => setEachMessages(text)} 
              placeholder={'Write your message here...'}
              placeholderTextColor='lightgray'
            ></TextInput>
            <TouchableOpacity onPress={()=>{sendMessage()}}>
              <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
            </TouchableOpacity>
          </View> 
    </SafeAreaView>
  )
}

export default PersonalChat

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
})