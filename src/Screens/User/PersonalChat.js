// import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
// import React from 'react'
// import { COLORS } from '../../Constant/Colors'
// import { useEffect,useState } from 'react'
// import { FlatList } from 'react-native-gesture-handler'
// import { LocalStorage } from '../../services/Api'
// import firestore from '@react-native-firebase/firestore'
// import Toast from 'react-native-simple-toast';

// const PersonalChat = ({navigation,route}) => {
//   const [messages, setMessages] = useState([]);
//   const [EachMessages, setEachMessages] = useState('');
//   const [userID, setUserID] = useState();
//   useEffect(()=>{
//     getUser()
//     alert(JSON.stringify(route.params,null,2))
//   },[])

//   useEffect(() => {
//     if(userID) {
//       getUserChat()
//     }
//   }, [userID])

//   const getUser = async () => {
//     const user = (await LocalStorage.getUserDetail() || '')
//     const newUser = JSON.parse(user)
//     setUserID(newUser.id)
//   }
//   const getUserChat = async() => {
//     const docId = route.params.userDetail.vendor_id > userID ? userID+"-"+ route.params.userDetail.vendor_id : route.params.userDetail.vendor_id+"-"+userID 
//     // alert(docId)
//     const ruffchats = await firestore().collection('chatroom').doc(docId).collection('messages').orderBy('createdAt','asc').get()
//       const chats = ruffchats.docs.map((item)=> {
//         return {
//           ...item.data(),
//           createdAt:item.data().createAt.toDate()
//         }
//       })
//       console.log(chats)
//       setMessages(chats) 
//   }

//   const sendMessage = async() => {
//     if(!EachMessages){
//       Toast.show("Write your message")
//       return
//     }
//     const msg = {
//       'message' : EachMessages,
//       'sendBy' :  userID,
//       'sendTo': route.params.userDetail.vendor_id,
//       'createdAt' : new Date()
//     }
//     setMessages(prevState => [...prevState, msg])
//     const docId = route.params.userDetail.vendor_id > userID ? userID+"-"+ route.params.userDetail.vendor_id : route.params.userDetail.vendor_id+"-"+userID 
//     firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
//     setEachMessages('')
//   }
//   return (
//     <SafeAreaView style={{flex:1}}>
//       <View style={{ flexDirection: 'row', justifyContent:'space-between', marginTop: StatusBar.currentHeight, alignItems: 'center' , width:'100%'}}>
//               <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
//                   <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
//               </TouchableOpacity>
//               <Text style={{color:COLORS.orange, fontSize:20, fontWeight:'700', width:'50%', textAlign:'center', marginRight:'auto'}}><Text style={{color:COLORS.blue}}>Chat</Text> with {route.params.userDetail.sender}</Text>
//           </View>
//           <ScrollView>
//           <FlatList
//               data={messages}
//               renderItem={({item})=> (
//                 <View>
//                   {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
//                   {/* <View>
//                     <Text style={{color:'black'}}>{item.date}</Text>
//                   </View> */}
//                   {item.sendBy === userID?
//                     (
//                       <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
//                         <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
//                         {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.createAt}</Text> */}
//                       </View>
//                     ) :
//                     (
//                       <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
//                         <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
//                         {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.createdAt}</Text> */}
//                       </View>
//                     )
//                   }  
//                 </View>
//               )}
//             />
//           </ScrollView>
//           <View style={{ flexDirection: 'row', marginVertical:10, marginHorizontal:10, }}>
//             <TextInput
//              style={styles.textInput}
//              value={EachMessages}
//               onChangeText={text => setEachMessages(text)} 
//               placeholder={'Write your message here...'}
//               placeholderTextColor='lightgray'
//             ></TextInput>
//             <TouchableOpacity onPress={()=>{sendMessage()}}>
//               <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
//             </TouchableOpacity>
//           </View> 
//     </SafeAreaView>
//   )
// }

// export default PersonalChat

// const styles = StyleSheet.create({
//   crossImage: {
//     // marginTop: StatusBar.currentHeight,
//     marginLeft: 20,
//     alignItems:'center',
//     marginRight:20,
//     width: '10%',
//     padding: 5,
//     backgroundColor:'#FFF',
//     borderRadius:10
//   },
//   textInput: {
//     borderRadius: 6,
//     borderWidth: 1,
//     padding: 10,
//     // width: '80%',
//     // paddingHorizontal: 15,
//     // marginHorizontal: 10,
//     // marginTop: 10,
//     // position: 'absolute',
//     // bottom: 0,
//     // marginBottom: 10,
//     marginRight:10,
//     fontSize: 14,
//     fontFamily: 'Poppins-SemiBold',
//     fontWeight: '600',
//     flex:2,
//     backgroundColor: '#fff',
//     borderColor: 'grey',
//     color: '#000'
//   },
// })



import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, initializeFirestore, setDoc, doc, serverTimestamp, orderBy, Query, onSnapshot, Timestamp, } from "firebase/firestore";
import { Api, LocalStorage } from '../../services/Api';
import { COLORS } from '../../Constant/Colors';
import { TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

const PersonalChat = ({ route, navigation }) => {
  // alert(JSON.stringify(route.params,null,2))
  let flatList = useRef(null);
  const [userID, setUserID] = useState();
  const [messages, setMessages] = useState([]);
  const [EachMessages, setEachMessages] = useState('');
  const [messageForApi, setMessagesForApi] = useState('');

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBTOlZlSSZwPqlrxe4sYKYK6xx9nzmNu-I",
  //   authDomain: "profilebaba-e1037.firebaseapp.com",
  //   databaseURL: "https://profilebaba-e1037-default-rtdb.firebaseio.com",
  //   projectId: "profilebaba-e1037",
  //   storageBucket: "profilebaba-e1037.appspot.com",
  //   messagingSenderId: "758155398283",
  //   appId: "1:758155398283:web:19b7deb559ef6f20c5188e",
  //   measurementId: "G-748ZS3W535"
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyAiX-d0zYw9ynaX-jc-OWs4C8DPbCplLwA",
    authDomain: "profilebaba-4d6dd.firebaseapp.com",
    projectId: "profilebaba-4d6dd",
    storageBucket: "profilebaba-4d6dd.appspot.com",
    messagingSenderId: "360523540697",
    appId: "1:360523540697:web:3afddb6e2211349af6b6c8",
    measurementId: "G-FLZND4Q6YH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });


  useEffect(() => {
    // return
    getUser()
  }, [])

  useEffect(() => {
    if (userID) {
      getDATA()
      // getUserChat()
    }
  }, [userID])


  const getUser = async () => {
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    setUserID(newUser.id)
  }
  const getDATA = async () => {
    const docId = route.params.userDetail.sender_id > route.params.userDetail.vendor_id ? route.params.userDetail.vendor_id + "-" + route.params.userDetail.sender_id : route.params.userDetail.sender_id + "-" + route.params.userDetail.vendor_id;

    onSnapshot(query(collection(firestore, docId), orderBy("createdAt")), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }

  // alert(JSON.stringify(messages,null,2))
  const sendMessage = async() => {
    if(!EachMessages){
      Toast.show("Write your message")
      return
    }
    const msg = {
      'message' : EachMessages,
      'sendBy' :  route.params.userDetail.vendor_id,
      'sendTo': route.params.userDetail.sender_id,
      'createdAt' : Timestamp.fromDate(new Date())
    }
    // alert(JSON.stringify(msg,null,2))
    // return
    setEachMessages('')
    setMessages(prevState => [...prevState, msg])
    const docId = route.params.userDetail.sender_id > route.params.userDetail.vendor_id ? route.params.userDetail.vendor_id + "-" + route.params.userDetail.sender_id : route.params.userDetail.sender_id + "-" + route.params.userDetail.vendor_id; 
    // firestore().collection('chatroom').doc(docId).collection('messages').add({...msg, createAt:firestore.FieldValue.serverTimestamp()})
    await addDoc(collection(firestore, docId), {
      ...msg, createAt: Timestamp.now(),
    });
    const body = {
      "sender_id": route.params.userDetail.vendor_id,
      "receiver_id": route.params.userDetail.sender_id,
      "vendor": "sender",
      "message":messageForApi,
    }
    // alert(JSON.stringify(body,null,2))
    // return
    const response = await Api.sendOneToOneChat(body)
    // alert(JSON.stringify(response,null,2))
    const {success} = response;
  }

  function tConvert (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#F5F5F5" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, alignItems: 'center', width: '100%', marginBottom:8 }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
          <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.orange, fontSize: 20, fontWeight: '700', width: '100%', textAlign: 'left', }}><Text style={{ color: COLORS.blue }}>Chat with </Text>{route.params.userDetail.sender} </Text>
      </View>
      <FlatList
        data={messages}
        ref={flatList}
        onContentSizeChange={() => flatList?.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => (
          <View>
            {/* <View style={{alignItems:'center', }}>
                  <Text style={{color:'gray',backgroundColor:'#FFF', padding:5, borderRadius:5}}>{new Date(item.createAt.seconds * 1000).toLocaleDateString("en-IN")}</Text> 
                </View> */}
            {/* {console.log(item)} */}
            {item.sendBy == route.params.userDetail.vendor_id ?
              (
                <View style={{ fontFamily: 'Poppins', alignItems: 'flex-end', }}>
                  <Text style={{maxWidth:'80%', color: 'white', backgroundColor: COLORS.blue, paddingHorizontal: 20, paddingVertical: 10, marginHorizontal: 10, marginVertical: 5, borderRadius:15, borderBottomRightRadius:0 }}>{item.message}</Text>
                  {/* <Text style={{color:'gray',marginHorizontal:14, fontSize:10}}>{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</Text> */}
                  {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{moment(item.createAt?.seconds* 1000 + item.createAt?.nanoseconds/1000000).format('hh:MMa') }</Text> */}
                  {/* <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{new Date(item.createAt?.seconds * 1000).toLocaleString()}</Text> */}
                  <Text style={{color:'gray',marginHorizontal:14, fontSize:10}}>{new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[1]} {new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[2]}, {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</Text>
                </View>
              ) :
              (
                <View style={{ fontFamily: 'Poppins', alignSelf: 'flex-start', }}>
                  <Text style={{maxWidth:'80%', color: 'black', backgroundColor: 'lightgray', paddingHorizontal: 20, paddingVertical: 10, margin: 10, borderRadius:15, borderTopLeftRadius:0 }}>{item.message}</Text>
                  {/* <Text style={{color:'gray',marginHorizontal:14, fontSize:10}}>{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</Text> */}
                  <Text style={{color:'gray',marginHorizontal:14, fontSize:10}}>{new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[1]} {new Date(item.createAt?.seconds * 1000).toDateString().split(' ')[2]}, {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[0]}:{tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(":")[1]} {tConvert(new Date(item.createAt?.seconds * 1000).toLocaleTimeString("en-IN")).split(" ")[1]}</Text>
                </View>
              )
            }
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10, }}>
        <TextInput
          style={styles.textInput}
           value={EachMessages}
            onChangeText={text => {
              setMessagesForApi(text)
              setEachMessages(text)
            }} 
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
    marginLeft: 20,
    alignItems: 'center',
    marginRight: 10,
    width: '10%',
    padding: 5,
    // backgroundColor: '#FFF',
    borderRadius: 10
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    flex: 2,
    backgroundColor: '#fff',
    borderColor: 'grey',
    color: '#000'
  },
})