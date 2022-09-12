import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import { FloatingAction } from 'react-native-floating-action'
import ThisWeekLeads from './ThisWeekLeads'
import AllLeads from './AllLeads'
import { LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import moment from 'moment'

const Leads = ({navigation}) => {
    const [data, setData] = useState([
        {key:1, value: 'This Week'},
        {key:2, value: 'All'},
    ])
    const [select, setSelect] = useState(0)
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
    const [leadData, setLeadData] = useState([
        {
            category: 'Plumber',
            time: '10:30pm',
            date: '2 Nov 2022',
            message: 'Water supply not working',
            icon: require('../../images/avatar1.png'),
            name: 'Ravi Verma',
            distance: '2.3Km',
            locationIcon: require('../../images/graylocation.png'),
            callIcon: require('../../images/call.png'),
            messageIcon: require('../../images/messagebig.png'),
            options: require('../../images/options.png')
        }
    ])
    const [weekData, setWeekData] = useState([])
    useEffect(()=> {
      getPlanHistory()
    },[])
    const getPlanHistory = async() => {
      const token = (await LocalStorage.getToken() || '')
      const user = (await LocalStorage.getUserDetail() || '')
      const newUser = JSON.parse(user)
      const btoken = `Bearer ${token}`;
      const response = await fetch(`${BASE_URL}vendor-lead/10`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          "Authorization": btoken,
        }
      })
      const res = await response.json()
      setLeadData(res.data)
      // alert(JSON.stringify(res.data,null,2))
      let weekdata = res.data.map((item)=>{
        var now = moment();
        var input = moment(item.created_at);
        if(now.isoWeek() == input.isoWeek()){
          return item
        }
      })

      weekdata = weekdata.filter(x => x != null)
      setWeekData(weekdata)
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
    <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
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
      <View>
        <FlatList
          numColumns={2}
          // keyExtractor={item => item.id}
          data={data}
          style={{ marginTop: 20, }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: '45%',
                marginHorizontal: 10,
                marginBottom: 20
              }}
              onPress={() => setSelect(index)}>
              <View
                style={{
                  backgroundColor: index == select ? '#1899FE' : COLORS.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 5,
                  paddingVertical: 14,
                  borderRadius: 10
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Poopins',
                    fontSize: 18,
                    fontWeight: '600',
                    color: index == select ? COLORS.white : COLORS.black,
                    textAlign: 'center',
                  }}>
                  {item.value}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
        <ScrollView style={{}}>
          {select === 0 ? <ThisWeekLeads weekData={weekData} />: <AllLeads leadData={leadData}/>}
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

export default Leads

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