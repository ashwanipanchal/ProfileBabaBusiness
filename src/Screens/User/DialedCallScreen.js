// import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
// import React,{useCallback, useEffect, useRef, useState} from 'react'
// import { StatusBarDark } from '../../Custom/CustomStatusBar'
// const {height} = Dimensions.get('window');
// import RtcEngine from 'react-native-agora'

// const DialedCallScreen = ({navigation}) => {

//   const rtcEngine = useRef(null)
//   const [state, setState] = useState({
//     appId: 'c67e89f980304da08a5658484da68796',
//     channelName: 'test',
//     token: '007eJxTYODNerh8+fcb237e3pslGnEk5bHu1JkB2Z43btWFJ9/7vldagSHZzDzVwjLN0sLA2MAkJdHAItHUzNTCxALINrMwtzRzddRIPjpJM/lJbSMDIxSC+CwMJanFJQwMAEOwI3k=',
//     openMicrophone: true,
//     enableSpeakerphone: false,
//     joinSucceed: false,
//     peerIds: [],
//   })

//   useEffect(()=>{
//     initAgora()
//   },[])
//   const initAgora = useCallback(async() => {
//     rtcEngine.current = await RtcEngine.create(state.appId)
//     await rtcEngine.current?.enableAudio()
//     await rtcEngine.current?.setEnableSpeakerphone(true)
//     await rtcEngine.current?.muteLocalAudioStream(false)

//     await rtcEngine.current?.joinChannel(state.token, state.channelName, null, 0)
//     rtcEngine.current?.addListener('UserJoined', (uid, elapsed) => {
//       console.log('UserJoined', uid, elapsed)
//       const {peerIds} = state
//       if (peerIds.indexOf(uid) === -1) {
//           setState({
//               peerIds: [...peerIds, uid]
//           })
//       }
//   })
//   },[])
//   const joinChannel = async () => {
//     await engine?.joinChannel(state.token, state.channelName, null, 0)
//   }
//   return (
//     <View style={{flex:1, backgroundColor:'#F4F9FF'}}>
//         <StatusBarDark backgroundColor={'#fff'} />
//         <Image source={require('../../images/callavatar.png')} style={{resizeMode:'contain', width:150, height:150, alignSelf:'center', marginTop: height/3}}/>
//         <Text style={{fontSize:24, fontWeight:'700', alignSelf:'center', marginTop:20}}>Ravi Verma</Text>
//         <Text style={{fontSize:18, alignSelf:'center'}}>Ringing...</Text>
//         <View style={{flexDirection:'row', backgroundColor:'#fff', position:'absolute', bottom:0, width:'100%', justifyContent:'space-around', paddingVertical:20}}>
//             <Image source={require('../../images/speaker.png')} style={{width:60, height:60}}/>
//             <Image source={require('../../images/mic.png')} style={{width:60, height:60}}/>
//             <TouchableOpacity onPress={()=> navigation.goBack()}>
//                 <Image source={require('../../images/hangupbutton.png')} style={{width:60, height:60}}/>
//             </TouchableOpacity>
//         </View>
//     </View>
//   )
// }

// export default DialedCallScreen

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DialedCallScreen = () => {
  return (
    <View>
      <Text>DialedCallScreen</Text>
    </View>
  )
}

export default DialedCallScreen

const styles = StyleSheet.create({})