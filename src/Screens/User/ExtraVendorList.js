import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList, Linking, Modal, Dimensions } from 'react-native'
import React from 'react'
import Loader from '../../services/Loader'
import { useEffect } from 'react'
import { LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import { ScrollView } from 'react-native'
import { useState } from 'react'
import { COLORS } from '../../Constant/Colors'
const { height } = Dimensions.get('window');

const ExtraVendorList = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState('');
    const [userDetail, setUserDetail] = useState();
    useEffect(() => {
        // alert(JSON.stringify(route.params,null,2))
        getMoreVendors()
    }, [])

    const getMoreVendors = async () => {
        setLoading(true)
        const user = (await LocalStorage.getUserDetail() || '')
        const token = (await LocalStorage.getToken() || '')
        const newUser = JSON.parse(user)
        const btoken = `Bearer ${token}`;
        const response = await fetch(`${BASE_URL}get-vendor-for-chat/${route.params.id}`, {
            // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            }
        })
        const res = await response.json()
        setLoading(false)
        setData(res.data)
        // alert(JSON.stringify(res, null, 2))
    }

    const openCallModal = (item, index) => {
        // alert(JSON.stringify(item,null,2))
        // return
        setModalIndex(index)
        setModalOpen1(true)
    }
    const openMessageModal = (item, index) => {
        // alert(JSON.stringify(item,null,2))
        // return
        setUserDetail(item)
        setModalIndex(index)
        setModalOpen(true)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <Loader status={loading} />
            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 0 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                    <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 22, marginLeft: 20, fontWeight: '600' }}>More </Text>
                    <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 22, fontWeight: '600' }}>Vendors</Text>
                </View>
            </View>
            <ScrollView>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 10, marginBottom: 2, alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={require('../../images/avatar3.png')} style={{ width: 52, height: 52, marginTop: 8, resizeMode: 'contain' }} />
                                <View style={{ justifyContent: 'flex-start', marginLeft: 10, width: '70%' }}>
                                    <Text style={{ color: COLORS.black, fontSize: 18, }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        {/* <Text style={{color:COLORS.orange}}>{route.params.vendor.title}</Text> */}
                                        <Text style={{ color: 'gray', }}>{item.mobile_number}</Text>
                                        {/* <Image source={require('../../images/star.png')} style={{width:16, height:16, marginLeft:10, marginTop:5}}/> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {/* <Image source={require('../../images/graylocation.png')} style={{width:16, height:16,  marginTop:5, marginRight:5}}/> */}
                                            {/* <Text style={{color:'gray'}}>{item.address.slice(0, 10)}...</Text> */}
                                        </View>
                                        {/* <Text style={{color:'gray', marginLeft:5}}>•  {Math.round(item.distance)} Kms</Text> */}
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => openCallModal(item, index)}
                                >
                                    <Image source={require('../../images/call.png')} style={{ width: 52, height: 52, marginRight: 15 }} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => openMessageModal(item, index)}
                                >
                                    <Image source={require('../../images/messagebig.png')} style={{ width: 52, height: 52 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
            {data &&
                <View>
                    <Modal
                        visible={modalOpen}
                        transparent={true}
                        onRequestClose={() => setModalOpen(false)}>
                        <View style={styles.modal_View}>
                            <View activeOpacity={0.8} style={styles.modelMainBox}>
                                <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 20, marginLeft: 10, marginTop: 10 }}>Message via</Text>
                                {/* {data[modalIndex].register_by != 'web' && */}
                                    <TouchableOpacity onPress={() => {
                                        setModalOpen(false)
                                        navigation.navigate('PersonalChat', { userDetail, client: data[modalIndex] })
                                    }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                                        <Image source={require('../../images/modalmsg.png')} style={{ width: 40, height: 40 }} />
                                        <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Chat</Text>
                                    </TouchableOpacity>
                                {/* } */}
                                <TouchableOpacity onPress={() => {
                                    setModalOpen(false)
                                    Linking.openURL(`whatsapp://send?text=hello&phone=${data[modalIndex].contact_number}`)
                                }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                                    <Image source={require('../../images/modalwhatsapp.png')} style={{ width: 40, height: 40 }} />
                                    <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Whats App</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setModalOpen(false)
                                    Linking.openURL(`sms:${data[modalIndex].contact_number}?body=yourMessage`)
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
                        // key={data.index}
                        onRequestClose={() => setModalOpen1(false)}>
                        <View style={styles.modal_View}>
                            <View activeOpacity={0.8} style={styles.modelMainBox}>
                                <Text style={{ color: COLORS.black, fontSize: 18, marginBottom: 20, marginLeft: 10, marginTop: 10 }}>Call via</Text>
                                <TouchableOpacity onPress={() => {
                                    setModalOpen(false)
                                    //   alert(JSON.stringify(data[modalIndex]))
                                    Linking.openURL(`tel:${data[modalIndex].mobile_number}`)
                                }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                                    <Image source={require('../../images/dialerbig.png')} style={{ width: 40, height: 40 }} />
                                    <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Phone Dialer</Text>
                                </TouchableOpacity>
                                {/* {data[modalIndex].register_by != 'web' && */}
                                    <TouchableOpacity onPress={() => {
                                        setModalOpen(false)
                                        navigation.navigate('DialedCallScreen')
                                    }} style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', marginLeft: 10 }}>
                                        <Image source={require('../../images/callbig.png')} style={{ width: 40, height: 40 }} />
                                        <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 10 }}>Internet Call</Text>
                                    </TouchableOpacity>
                                {/* } */}
                            </View>
                        </View>
                    </Modal>
                </View>
            }

        </SafeAreaView>
    )
}

export default ExtraVendorList

const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    modal_View: {
        backgroundColor: '#000000aa',
        flex: 1,
    },
    modelMainBox: {
        padding: 10,
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