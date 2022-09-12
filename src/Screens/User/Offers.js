import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useEffect,useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import LinearGradient from 'react-native-linear-gradient'
import Geolocation from 'react-native-geolocation-service';
import { Api, height, LocalStorage } from '../../services/Api'
import { FloatingAction } from 'react-native-floating-action'
import Loader from '../../services/Loader'
import RazorpayCheckout from 'react-native-razorpay';
import {decode as atob, encode as btoa} from 'base-64'

const Offers = ({navigation}) => {
    const [coords, setCoords] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [viewMore, setViewMore] = useState(false)
    const [plans, setPlans] = useState([])
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
useEffect(()=> {
    getPlan()
    // generateOrderID()
},[])
const getPlan = async() => {
    const body = {
        'area' : '110043'
    }
    setIsLoading(true)
    const response = await Api.membershipPlans(body)
    const {success} = response
    // alert(JSON.stringify(response,null,2))
    console.log(response)
    setIsLoading(false)
    if(success){
        setPlans(response.data)
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

  const makePayment = async(item) => {
    const user = (await LocalStorage.getUserDetail()||'')
    const newUser = JSON.parse(user)
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
          contact: newUser.contact_number,
          name: newUser.name
        },
        theme: {color: '#53a20e'}
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        // alert(JSON.stringify(data,null,2));
        // alert('Payment Done')
        if(data.razorpay_payment_id){
            navigation.navigate('PaymentSuccess', data.razorpay_payment_id)
        }
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
    <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
    <Loader status={isLoading}/>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, alignItems: 'center', }}>
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
    <TouchableOpacity onPress={()=> {}} style={{width:'90%', height:50, alignSelf:'center', marginTop:15, borderRadius:10, borderColor: COLORS.blue, borderWidth:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <Text style={{color:COLORS.blue, marginLeft:15, fontSize:16, fontFamily:'Poppins-Regular'}}>Area</Text>
        <Image source={require('../../images/downarrow.png')} style={{width:24, height:24, marginRight:15}}/>
    </TouchableOpacity>
    <ScrollView>
        <Text style={{color:COLORS.black, fontSize:18, marginLeft:20, fontFamily:'Poppins-SemiBold', fontWeight:'600'}}>Choose Plan</Text>
        <FlatList
            data={plans}
            renderItem={({item})=> (
                <TouchableOpacity onPress={() => {setViewMore(prevstate => !prevstate)}} style={{ width: '90%', paddingVertical:15, backgroundColor: '#FFF', alignSelf: 'center', marginTop: 15, borderRadius: 10,  justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, flexDirection:'row' }}>
                    <View style={{marginHorizontal:10}}>
                        <Text style={{color:COLORS.orange, fontSize:16}}>{item.title}</Text>
                        <Text style={{color:COLORS.black, marginTop:5}}>Min {item.min_lead}</Text>
                        {viewMore && <View>
                            <Text style={{ color: 'black' }}>Description : {item.description}</Text>
                            <Text style={{ color: 'black' }}>Price: ₹ {item.total_price}/- </Text>
                            <TouchableOpacity onPress={()=> makePayment(item)} style={{width:'auto',backgroundColor: COLORS.blue, paddingVertical:10, paddingHorizontal:10, marginTop:10, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{color:'#FFF'}}>Buy Plan</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                    <View style={{marginHorizontal:10}}>
                        <Text style={{color:COLORS.black, fontSize:14, fontWeight:'600'}}>Select Quad</Text>
                        <Image source={require('../../images/downarrow.png')} style={{ alignSelf:'flex-end', width:24, height:24 }} />
                    </View>
                </TouchableOpacity>
            )}
        />
        <LinearGradient
              colors={['#F55B54', '#FAAD3A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 10,
                marginHorizontal: 10,
                height:100,
                borderRadius: 10,
                marginTop: 15,
                marginBottom:20
              }}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:24, color:'#fff'}}>Call us {`\n`}for more plan</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{paddingHorizontal:15,paddingVertical:10,  borderRadius:8, alignSelf:'center'}}><Image source={require('../../images/whitecall.png')} style={{width:38, height:38}}/></TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center',backgroundColor:'#FFF',paddingHorizontal:10, borderRadius:8, marginLeft:10}}><Text style={{color:'#F7754C'}}>Messages</Text></TouchableOpacity>
                    </View>
                </View>
        </LinearGradient>
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
            if(name == 'message'){
                navigation.navigate("AdminChat")
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
        backgroundColor: '#FFF',
        borderRadius: 10
      },
})