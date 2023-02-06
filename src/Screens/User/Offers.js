import { Alert, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from 'react-native-geolocation-service';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import { Api, height, LocalStorage } from '../../services/Api'
import { FloatingAction } from 'react-native-floating-action'
import Loader from '../../services/Loader'
import RazorpayCheckout from 'react-native-razorpay';
import { decode as atob, encode as btoa } from 'base-64'
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../services/Config'
import BottomSheet from "react-native-gesture-bottom-sheet";
import SelectDropdown from 'react-native-select-dropdown'
import { LayoutAnimation } from 'react-native'
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

const Offers = ({ navigation }) => {
    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state => {
          // alert(JSON.stringify(state,null,2))
          if(!state.isConnected){
            // Alert.alert('No Connection', 'Please check your internet connection and Try Again')
            // check()
          }else{
            getUser()
            getPlan()
            getNotification()
          }
        });
        return (
          () => unsubscribe()
        )
      },[])
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const areasheet = useRef();
    const [coords, setCoords] = useState()
    const [area, setArea] = useState([])
    const [updatedArea, setUpdatedArea] = useState()
    const [tt, setTT] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [leads, setLeads] = useState(1)
    const [viewMore, setViewMore] = useState(false)
    const [plans, setPlans] = useState([])
    const [notificationCount, setNotificationCount] = useState();
    const [state, setState] = useState({
        selectedIndex:'',
        open:false,
        activeIndex: ''
      })
    const Plans = [
        {
            title: '50 Leads @ 400Rs',
            subtitle: 'Min10'
        },
        {
            title: '20 Leads @ 200Rs',
            subtitle: 'Min10'
        },
        {
            title: '1 Leads @ 10Rs',
            subtitle: 'Min10'
        },
    ]
    useEffect(() => {
        getUser()
        getPlan()
        // generateOrderID()
    }, [])
    useFocusEffect(()=>{
        getNotification()
      },[getNotification])
    const getPlan = async () => {
        const body = {
            'area': updatedArea || '110043'
        }
        setIsLoading(true)
        const response = await Api.membershipPlans(body)
        const { success } = response
        setIsLoading(false)
        if (success) {
            setPlans(response.data)
        }
    }

    const getUser = async() => {
        const user = (await LocalStorage.getUserDetail()||'')
        const token = (await LocalStorage.getToken()||'')
        const newUser = JSON.parse(user)
        const btoken = `Bearer ${token}`;
        const response = await fetch(`${BASE_URL}user-profile/${newUser.id}`,{
          method:'GET',
          headers:{
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
          }
        })
        const res = await response.json()
        setArea(res.data.business_profile)
        // alert(JSON.stringify(res.data.business_profile,null,2))
        // console.log(JSON.stringify(res.data.business_profile))
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

    const creditPlan = async (data, item) => {
        // alert(JSON.stringify(leads,null,2))
        // return
        setIsLoading(true)
        const user = (await LocalStorage.getUserDetail() || '')
        const newUser = JSON.parse(user)
        const body = {
            "vendor_id": newUser.id,
            "plan_id": item.id,
            "leads": item.price_per_lead == null ? item.lead : leads,
            "payment_mode": "online",
            "payment_key": data.razorpay_payment_id,
            "signature": data.razorpay_signature,
            "order_id": data.razorpay_order_id
        }
        // alert(JSON.stringify(body,null,2))
        // return
        const response = await Api.saveVendorPlan(body)
        const { success } = response;
        setIsLoading(false)
        if (success) {
            navigation.navigate('PaymentSuccess', data.razorpay_payment_id)
        } else {
            Alert("Payment Failed")
        }
    }

    const makePayment = async (item) => {
        const user = (await LocalStorage.getUserDetail() || '')
        const newUser = JSON.parse(user)
        if (item.total_price !== null) {
            // alert(JSON.stringify(newUser,null,2))
            // return
            const body = {
                "amount": `${item.total_price}00`,
                "currency": "INR",
                "receipt": "Receipt no. 1",
                "notes": {
                    "notes_key_1": "Nick",
                    "notes_key_2": "Nick"
                }
            }
            const res = await fetch('https://api.razorpay.com/v1/orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Basic ' + btoa('rzp_test_zHe1g6NarBxhhE' + ":" + 'AEBq1ustLxgGZkrCYLrHdLtb'),
                },

                body: JSON.stringify(body)
            })
            const response = await res.json()
            console.log(response.id)

            var options = {
                description: 'Profile Baba',
                image: 'https://profilebaba.com/public/image/logo.png',
                currency: 'INR',
                key: 'rzp_test_zHe1g6NarBxhhE',
                amount: `${item.total_price}00`,
                name: 'Profile Baba',
                order_id: response.id,//Replace this with an order_id created using Orders API.
                prefill: {
                    email: newUser.email,
                    contact: `+91${newUser.contact_number}`,
                    name: newUser.name
                },
                theme: { color: '#53a20e' }
            }
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                // alert(JSON.stringify(data,null,2));
                // alert('Payment Done')
                console.log(data)
                if (data.razorpay_payment_id) {
                    creditPlan(data, item)
                }
            }).catch((error) => {
                // handle failure
                alert('Payment Failed')
                // alert(`Error: ${error.code} | ${error.description}`);
            });
        } else {
            if (leads < item.min_lead) {
                alert(`Minimum ${item.min_lead} leads require`)
            } else {

                const body = {
                    "amount": `${leads * item.price_per_lead}00`,
                    "currency": "INR",
                    "receipt": "Receipt no. 1",
                    "notes": {
                        "notes_key_1": "Nick",
                        "notes_key_2": "Nick"
                    }
                }


                const res = await fetch('https://api.razorpay.com/v1/orders', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Basic ' + btoa('rzp_test_zHe1g6NarBxhhE' + ":" + 'AEBq1ustLxgGZkrCYLrHdLtb'),
                    },

                    body: JSON.stringify(body)
                })
                const response = await res.json()
                console.log(response.id)

                var options = {
                    description: 'Profile Baba',
                    image: 'https://profilebaba.com/public/image/logo.png',
                    currency: 'INR',
                    key: 'rzp_test_zHe1g6NarBxhhE',
                    amount: `${leads * item.price_per_lead}00`,
                    name: 'Profile Baba',
                    order_id: response.id,//Replace this with an order_id created using Orders API.
                    prefill: {
                        email: newUser.email,
                        contact: `+91${newUser.contact_number}`,
                        name: newUser.name
                    },
                    theme: { color: '#53a20e' }
                }
                RazorpayCheckout.open(options).then((data) => {
                    // handle success
                    // alert(JSON.stringify(data,null,2));
                    // alert('Payment Done')
                    console.log(data)
                    if (data.razorpay_payment_id) {
                        creditPlan(data, item)
                    }
                }).catch((error) => {
                    // handle failure
                    alert('Payment Failed')
                    // alert(`Error: ${error.code} | ${error.description}`);
                });
            }
        }
    }

    const expendPlan = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setState({ open: !state.open, activeIndex: state.open == true ? index : ''})
        
    }

    const updatePlan = async() => {
        areasheet.current.close()
        getPlan(updatePlan)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 10 }}>
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
                        // <Text style={{ color: 'white', position: 'absolute', top: -2, right: 1, backgroundColor: 'red', borderRadius: 70, paddingHorizontal: 5, elevation:8 }}>{notificationCount}</Text>
                        <View style={{ position: 'absolute', top: -10, right: -2, backgroundColor: 'red', borderRadius: 50, paddingHorizontal: 3, paddingVertical: 2, }}>

                            <Text style={{ color: 'white', elevation: 8, fontSize: 10, textAlign: 'center' }}>{notificationCount}</Text>
                        </View>
                    }
                </View>
            </View>
            <Loader status={isLoading} />
            <TouchableOpacity activeOpacity={1} onPress={() => {areasheet.current.show()}} style={{ width: '90%', height: 50, alignSelf: 'center',  borderRadius: 10, borderColor: COLORS.blue, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                <Text style={{ color: COLORS.blue, marginLeft: 15, fontSize: 16, fontFamily: 'Poppins-Regular' }}>Area</Text>
                <Image source={require('../../images/downarrow.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
            </TouchableOpacity>
            <ScrollView>
                <Text style={{ color: COLORS.black, fontSize: 18, marginLeft: 20, fontFamily: 'Poppins-SemiBold', fontWeight: '600', marginBottom:10 }}>Choose Plan</Text>
                <FlatList
                    data={plans}
                    renderItem={({ item, index }) => (
                        <View  style={{ width: '90%', paddingVertical: 15, backgroundColor: '#FFF', alignSelf: 'center',  borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexDirection: 'row', elevation:2 }}>
                            <View style={{ marginHorizontal: 10 }}>
                                <Text style={{ color: COLORS.orange, fontSize: 16 }}>{item.title}</Text>
                                <Text style={{ color: COLORS.black, marginTop: 5, marginBottom: 5 }}>Min {item.min_lead}</Text>
                                {state.activeIndex === index && <View>
                                    {item.price_per_lead !== null &&
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => { setLeads(leads - 1) }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ color: COLORS.black, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10, }}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={{ color: COLORS.black, marginHorizontal: 10, fontSize:16, fontWeight:'600' ,  width:'15%', alignSelf:'center'}}>{leads}</Text>
                                            <TouchableOpacity onPress={() => { setLeads(leads + 1) }}>
                                                <Text style={{ color: COLORS.black, borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <Text style={{ color: 'black' }}>Description : {item.description}</Text>
                                    <Text style={{ color: 'black' }}>Price: ₹ {item.total_price !== null ? item.total_price : leads * item.price_per_lead}/- </Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => makePayment(item)} style={{ width: 'auto', backgroundColor: COLORS.blue, paddingVertical: 10, paddingHorizontal: 10, marginTop: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center',elevation:5 }}>
                                        <Text style={{ color: '#FFF' }}>Buy Plan</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => { expendPlan(index) }} style={{ marginHorizontal: 10, padding:5 , }}>
                                <Text style={{ color: COLORS.black, fontSize: 14, fontWeight: '600',  alignSelf:'flex-end',width:'110%'}}>Select Qty</Text>
                                <Image source={require('../../images/downarrow.png')} style={{ alignSelf: 'flex-end', width: 24, height: 24 }} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <LinearGradient
                    colors={['#F55B54', '#FAAD3A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        padding: 10,
                        marginHorizontal: 10,
                        height: 100,
                        borderRadius: 10,
                        marginTop: 15,
                        marginBottom: 20,
                        elevation:3
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',elevation:2 }}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Call us {`\n`}for more plan</Text>
                        <View style={{ flexDirection: 'row' , alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>navigation.navigate('ExecutivesNumber')} style={{ paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, alignSelf: 'center' }}><Image source={require('../../images/whitecall.png')} style={{ width: 40, height: 40 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={()=>navigation.navigate('ExecutivesNumber')} style={{height:'70%', justifyContent: 'center', backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 8, elevation:2 , alignItems:'center' }}><Text style={{ color: '#F7754C' }}>Messages</Text></TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
            <BottomSheet draggable={false} radius={20} ref={areasheet} height={500}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'}}>
                    <Text style={{ color: COLORS.black, fontSize: 22, marginLeft: 15, fontWeight: '600', paddingVertical: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>Area</Text>
                    <TouchableOpacity onPress={() => { areasheet.current.close() }}>
                        <Image source={require('../../images/Add.png')} style={{ height: 22, width: 22, resizeMode: "contain", borderRadius: 50, marginRight: 15, borderColor: 'black', borderWidth: 1, padding: 3 }} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <FlatList
                        style={{}}
                        data={area}
                        renderItem={({ item, index }) => {
                            const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
                            // alert(JSON.stringify(item,null,2))
                            return (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                    setTT(index)
                                    // setOccupation(item)
                                    // setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                                    // setSubCategory('')
                                    // setTT2('')
                                    // areasheet.current.close()
                                    setUpdatedArea(item.contact_info[0].pincode)
                                }} style={{ marginHorizontal: 20, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgray', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row',  width:'100%', justifyContent:'space-between' }}>
                                        <Text style={{ color: COLORS.black, marginLeft: 10, fontSize:18 }}>{item.contact_info[0].pincode}</Text>
                                    {tt == index ? <Image style={{ height: 22, width: 22, marginRight:10 }} source={require('../../images/done.png')} /> : null}
                                    </View>
                                </TouchableOpacity>
                            )
                        }} />
                </ScrollView>
                <TouchableOpacity onPress={()=> {updatePlan()}}  style={{width:'80%', alignSelf:'center',  marginBottom:10}}>
                    <Text style={{color:COLORS.blue, borderColor: COLORS.blue, borderWidth:1, paddingVertical:14, fontSize:18, paddingHorizontal:20, fontFamily:'Poppins', borderRadius:10, textAlign:'center'}}>Apply</Text>
                </TouchableOpacity>
            </BottomSheet>
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
                    } else {
                        navigation.navigate('ExecutivesNumber')
                    }
                }}
            />
        </SafeAreaView>
    )
}

export default Offers

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