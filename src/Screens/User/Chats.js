import { FlatList, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { FloatingAction } from 'react-native-floating-action'
import { COLORS } from '../../Constant/Colors'
import firestore from '@react-native-firebase/firestore';
import { Api, LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import moment from 'moment'

const Chats = ({ navigation }) => {
    const [userChat, setUserChat] = useState()
    useEffect(() => {
        // getChats()
    }, [])

    const getChats = async () => {
        const token = (await LocalStorage.getToken() || '')
        const user = (await LocalStorage.getUserDetail() || '')
        const newUser = JSON.parse(user)
        const btoken = `Bearer ${token}`;
        const response = await fetch(`${BASE_URL}get-chat/5751`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            }
        })
        const res = await response.json()
        console.log(res)
        alert(JSON.stringify(res, null, 2))
        setUserChat(res.data)

    }
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
                flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, alignItems: 'center', elevation: 0.5, shadowColor: '#000',
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
                <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={styles.crossImage}>
                    <Image source={require('../../images/homebell.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 20 }}>
                <FlatList
                    data={userChat}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', backgroundColor: '#FFF', marginBottom: 2, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Image source={item.friend_profile_pic} style={{ width: 52, height: 52, resizeMode: 'contain', alignSelf: 'center', marginLeft: 20 }} />
                                <View style={{ marginLeft: 15, paddingVertical: 20 }}>
                                    <Text style={{ color: '#000', fontSize: 18, fontFamily: 'Poppins', marginBottom: 5 }}>{item.user2_name}</Text>
                                    {/* <Text style={{color:'#000', color: COLORS.orange, fontSize:15, marginBottom:5}}>{item.category} <Text style={{color:'gray'}}>• {item.address}</Text> </Text> */}
                                    <Text style={{ color: 'gray', fontSize: 15 }}>{item.chat[0].message}</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: 20, alignItems: 'flex-end', marginRight: 20 }}>
                                <Text style={{ color: 'gray', marginBottom: 10 }}>{moment(item.chat[0].created_at).format('hh:mma')}</Text>
                                {/* <Image source={item.icon} style={{width:20, height:20, resizeMode:'contain'}}/> */}
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
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
        backgroundColor: '#FFF',
        borderRadius: 10
    },
})