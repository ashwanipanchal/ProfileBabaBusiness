import { StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, ScrollView, FlatList, TextInput, ImageBackground, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import { Button } from 'react-native-paper'
import { BASE_URL } from '../../services/Config'
import { ButtonStyle } from '../../Custom/CustomView'
import { LocalStorage } from '../../services/Api'
import Loader from '../../services/Loader'
import moment from 'moment/moment'
import { FloatingAction } from 'react-native-floating-action'


const Account = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [transaction, setTransaction] = useState([])
  useLayoutEffect(()=>{
    getPlanHistory()
  },[])
  
  const getPlanHistory = async() => {
    setLoading(true)
    const token = (await LocalStorage.getToken() || '')
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}vendor-history/5331`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        "Authorization": btoken,
      }
    })
    const res = await response.json()
    console.log(JSON.stringify(res))
    alert(JSON.stringify(res,null,2))
    // return
    // return
    setData(res.data)
    // setTransaction(res.data.transaction.plans)
    setLoading(false)
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


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
    <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
    <Loader status={loading}/>
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
    <ScrollView>
      {data &&
          <View style={{backgroundColor:'#FFF', marginTop:20, paddingVertical:20,paddingHorizontal:12}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{color:COLORS.orange, fontSize:16}}>Plan</Text>
            {data.active_plan ? <Text style={{color:COLORS.lightBlack}}>{data.active_plan.plans.title}</Text>:<Text style={{color:COLORS.lightBlack}}>{'No Plan Active'}</Text>}
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
            <Text style={{color:COLORS.lightBlack}}>Pending</Text>
            <Text style={{color:COLORS.lightGray}}>{data.leads.pending}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:5}}>
            <Text style={{color:COLORS.lightBlack}}>Usage</Text>
            <Text style={{color:COLORS.lightGray}}>{data.leads.total - data.leads.pending}</Text>
          </View>
        </View>}
      <Text style={{color:'#1899FE', marginVertical:20, marginLeft:14, fontSize:20}}>Transaction History</Text>
      {/* {'transaction' in data &&
        <FlatList
        data={data.transaction}
        renderItem={({item})=> (
          <View style={{ backgroundColor: '#FFF', marginTop: 10, paddingVertical: 20, paddingHorizontal: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: COLORS.orange, fontSize: 16 }}>Plan</Text>
              <Text style={{ color: COLORS.lightBlack }}>{item.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ color: COLORS.lightBlack }}>Start Date</Text>
              <Text style={{ color: COLORS.lightGray }}>{moment(item.created_at).format('MMM DD, YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ color: COLORS.lightBlack }}>End Date</Text>
              <Text style={{ color: COLORS.lightGray }}>-</Text>
            </View>
          </View>
        )}
      /> 
      } */}
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

export default Account

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
      textInput: {
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        backgroundColor: '#fff',
        borderColor: 'grey',
        color: '#000'
      },
})