
import React, { useState,useEffect,useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image,StatusBar, FlatList, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'
import { LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config'
import moment from 'moment'



const Notification = ({navigation, route}) => {    
//  alert(JSON.stringify(route.params,null,2))
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    // {
    //   name :'Raj Verma',
    //   icon : require('../../images/avatar1.png'),
    //   category: 'Plumber',
    //   location: 'Noida Sec 40',
    //   time: '2:13 pm',
    //   message : 'Deal Completed',
    //   smallIcon: require('../../images/done.png')
    // },
    // {
    //   name :'Raj Verma',
    //   icon : require('../../images/avatar1.png'),
    //   category: 'Plumber',
    //   location: 'Noida Sec 40',
    //   time: '2:13 pm',
    //   message : 'Deal Completed',
    //   smallIcon: require('../../images/done.png')
    // },
    // {
    //   name :'Raj Verma',
    //   icon : require('../../images/avatar1.png'),
    //   category: 'Plumber',
    //   location: 'Noida Sec 40',
    //   time: '2:13 pm',
    //   message : 'Deal Completed',
    //   smallIcon: require('../../images/done.png')
    // },
  ])

  useEffect(()=> {
    getNotification()
  },[])

  const getNotification = async() => {
    setLoading(true)
    const token = (await LocalStorage.getToken() || '')
    const user = (await LocalStorage.getUserDetail() || '')
    const newUser = JSON.parse(user)
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}get-notification/${newUser.id}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        }
    })
    const res = await response.json()
    setData(res.data.reverse())
    setLoading(false)
    // alert(JSON.stringify(res.data,null,2))
  }

  const viewNotification = async(item) => {
    const token = (await LocalStorage.getToken() || '')
    const btoken = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}read-notification/${item.id}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
        }
    })
    const res = await response.json()
    const {success} = res;
    if(success){
      getNotification()
    }
  }
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>{
      getNotification()
      setRefreshing(false)
    });
    }, []);
    
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
  
  if(loading){
    return (
      <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
          <View style={{ flexDirection: 'row', marginBottom:30 , marginTop:10}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Image source={require('../../images/Notification.png')} style={{  marginLeft: 10, width: 120, height: 32, alignSelf: 'center', resizeMode: 'contain' }} />
          </View>
    <ActivityIndicator size={'small'}></ActivityIndicator>
    </View>
    )
  }
  return (
    <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
          <View style={{ flexDirection: 'row', marginBottom:10 , marginTop:10}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Image source={require('../../images/Notification.png')} style={{  marginLeft: 10, width: 120, height: 32, alignSelf: 'center', resizeMode: 'contain' }} />
          </View>
            <FlatList 
              data={data}
              refreshControl={
                <RefreshControl
                  // colors={["#9Bd35A", "#689F38"]}
                  colors={[COLORS.orange, COLORS.blue]}
                  refreshing={refreshing}
                  onRefresh={onRefresh} />
              }
              renderItem={({item})=> (
                // <TouchableOpacity activeOpacity={0.9} onPress={()=> viewNotification(item)} style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor: item.status == 0 ? '#fff' : 'f5f5f5', paddingVertical:12, marginBottom:2}}>
                //   <View style={{flexDirection:'row'}}>
                //     <Image source={require('../../images/avatar1.png')} style={{width:56, height:56, resizeMode:'contain', alignSelf:'center'}}/>
                //     <View style={{marginLeft:12, }}>
                //       <Text style={{fontSize:15, color:COLORS.black}}>{item.message}</Text>
                //       <View style={{flexDirection:'row'}}>
                //           <Text style={{ color:COLORS.orange}}>{item.category ? item.category : null}</Text>
                //           <Text> • </Text>
                //           <Text  style={{ color:COLORS.lightGray}}>{item.location? item.location : null}</Text>
                //       </View>
                //       <Text style={{color:COLORS.lightGray}}>{item.message}</Text>
                //     </View>
                //   </View>
                //   <View>
                //     <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:mma')}</Text>
                //     {item.status == 0 ? 
                //       <Text style={{color:'red', alignSelf:'flex-end', marginTop:10, fontSize:20}}>•</Text>
                //     : null}
                //     <Image source={item.smallIcon} style={{width:22, height:22, resizeMode:'contain', alignSelf:'flex-end', marginTop:5}}/>
                //   </View>
                // </TouchableOpacity>
                <TouchableOpacity  activeOpacity={0.9} onPress={()=> viewNotification(item)} style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10,backgroundColor: item.status == 0 ? '#FFFFFA':'#fff',paddingVertical:10, marginBottom:2}}>
                      <Image source={require('../../images/default-user-image.png')} style={{width:56, height:56, resizeMode:'contain', alignSelf:'center'}}/>
                      <View style={{flex:1, marginLeft:10}}>
                        <Text style={{color:COLORS.black}}>{item.message}</Text>
                        <Text style={{color:COLORS.lightGray}}>{item.message}</Text>
                      </View>
                      <View>
                        <Text style={{color:COLORS.lightGray}}>{moment(item.created_at).format('hh:mma')}</Text>
                        {item.status == 0 ?
                        <Text style={{ color: 'red', alignSelf: 'flex-end', }}>•</Text>
                        : null}
                      </View>
                    </TouchableOpacity>
              )}
            />
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        // backgroundColor:'#FFF',
        borderRadius:10
      },
})