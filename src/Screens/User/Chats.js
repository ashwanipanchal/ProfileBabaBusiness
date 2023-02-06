import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View,Alert, Button, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { FloatingAction } from 'react-native-floating-action'
import { COLORS } from '../../Constant/Colors'
import firestore from '@react-native-firebase/firestore';
import { Api, LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import moment from 'moment'
import messaging from '@react-native-firebase/messaging';
import DatePicker from 'react-native-date-ranges';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
const Chats = ({ navigation }) => {
    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
          // alert(JSON.stringify(state,null,2))
          if(!state.isConnected){
            // Alert.alert('No Connection', 'Please check your internet connection and Try Again')
            // check()
          }else{
            getChats()
            getNotification()
          }
        });
        return (
          () => unsubscribe()
        )
      },[])
    const [userChat, setUserChat] = useState()
    const [refreshing, setRefreshing] = useState(false);
    const [chatLoading, setChatLoading] = useState(false);
    const [user, setUser] = useState()
    const [notificationCount, setNotificationCount] = useState();
    // useFocusEffect(()=>{
    //     getChats()
    //   },[getChats])

    useEffect(() => {
        getChats()
        const willFocusSubscription = navigation.addListener('focus', () => {
            getChats()
        });
    
        return willFocusSubscription
      }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() =>{
          getChats()
          setRefreshing(false)});
        }, []);
        
        const wait = (timeout) => {
          return new Promise(resolve => setTimeout(resolve, timeout));
        }

    useFocusEffect(()=>{
        getNotification()
      },[getNotification])
    
    // React.useMemo(async () => {
    
    //     try {
    //         const token = (await LocalStorage.getToken() || '')
    //         const user = (await LocalStorage.getUserDetail() || '')
    //         const newUser = JSON.parse(user)
    //         const btoken = `Bearer ${token}`;
    //         const response = await fetch(`${BASE_URL}get-chat/5751`, {
    //             method: 'GET',
    //             headers: {
    //                 "Accept": "application/json",
    //                 'Content-Type': 'application/json',
    //                 "Authorization": btoken,
    //             }
    //         })
    //         const res = await response.json()
    //         console.log(res)
    //         setUserChat(res.data)
    //     } catch(err) {
    //       throw err
    //     }
   
    // }, []);


    const getChats = async () => {
        // setChatLoading(true)
        const token = (await LocalStorage.getToken() || '')
        const user = (await LocalStorage.getUserDetail() || '')
        const fcm = (await LocalStorage.getFcmToken() || '')
        const newUser = JSON.parse(user)
        setUser(newUser)
        const btoken = `Bearer ${token}`;
        const response = await fetch(`${BASE_URL}get-chat/${newUser.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            }
        })
        const res = await response.json()
        // console.log(res)
        // alert(JSON.stringify(res.data, null, 2))
        // setChatLoading(false)
        setUserChat(res.data)
        const getSortedState = (data) => data.sort((a, b) => parseInt(a.createdAt) - parseInt(b.createdAt));
        // alert(JSON.stringify(getSortedState(res.data)),null,2)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          });
        unsubscribe()
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
    
      const customButton = (onConfirm) => (
        <Button
            onPress={onConfirm}
            style={{ container:{ width:'80%', marginHorizontal:'3%' }, text:{ fontSize: 20 } }}
            primary
            title='OK'
        />)

    const Chats = [
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
        {
            icon: require('../../images/avatar1.png'),
            name: 'Raj Verma',
            message: 'Water supply not working...',
            time: '11:13 PM'
        },
    ]
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
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom:10,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
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
                        // <Text style={{ color: 'white', position: 'absolute', top: -2, right: 1, backgroundColor: 'red', borderRadius: 70, paddingHorizontal: 5,elevation:8 }}>{notificationCount}</Text>
                        <View style={{ position: 'absolute', top: -10, right: -2, backgroundColor: 'red', borderRadius: 50, paddingHorizontal: 3, paddingVertical: 2, }}>

                            <Text style={{ color: 'white', elevation: 8, fontSize: 10, textAlign: 'center' }}>{notificationCount}</Text>
                        </View>
                    }
                </View>
            </View>
            {chatLoading ? 
                <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                    <ActivityIndicator color={'orange'} size={'large'} />
                </View> :
                <FlatList
                    data={userChat}
                    style={{}}
                    refreshControl={
                        <RefreshControl
                          // colors={["#9Bd35A", "#689F38"]}
                          colors={[COLORS.orange, COLORS.blue]}
                          refreshing={refreshing}
                          onRefresh={onRefresh} />
                      }
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                            // alert(JSON.stringify(item,null,2))
                            navigation.navigate('PersonalChat',{userDetail: item})
                            }} style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, paddingVertical:10 }}>
                                <Image source={{uri : item.friend_profile_pic}} style={{ width: 52, height: 52, resizeMode: 'contain', alignSelf: 'center', marginLeft: 15, borderRadius:50 }} />
                                <View style={{ marginLeft: 15,  flex:1, }}>
                                    {/* <Text style={{ color: '#000', fontSize: 18, fontFamily: 'Poppins'}}>{item.user1 == user.id? item.user2_name:item.user1_name }</Text> */}
                                    <Text style={{ color: '#000', fontSize: 18, fontFamily: 'Poppins'}}>{item.sender}</Text>
                                    {/* <Text style={{color:'#000', color: COLORS.orange, fontSize:15, marginBottom:5}}>{item.category} <Text style={{color:'gray'}}>• {item.address}</Text> </Text> */}
                                    <Text style={{ color: 'gray', fontSize: 15,  }}>{item.chat[item.chat.length - 1].sender_id == item.vendor_id ? <Image source={require('../../images/dialedcallicon.png')} style={{width:18, height:18, marginRight:5}}/> : null}{item.chat[item.chat.length - 1].message}</Text>
                                </View>
                                <View style={{marginRight:15}}>
                                    <Text style={{ color: 'gray',alignSelf:'flex-end'}}>{moment(item.chat[item.chat.length - 1].created_at).format('DD-MMM')}</Text>
                                    <Text style={{ color: 'gray', marginBottom: 10, alignSelf:'flex-end', fontSize:14 }}>{moment(item.chat[item.chat.length - 1].created_at).format('hh:mm A')}</Text>
                                    {/* <Image source={item.icon} style={{width:20, height:20, resizeMode:'contain'}}/> */}
                                </View>
                        </TouchableOpacity>
                    )}
                />}
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
                    }else{
                        navigation.navigate('ExecutivesNumber')
                    }
                }}
            />
        </SafeAreaView>
    )
}

export default Chats

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
})