
import React, { useState,useEffect,useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image,StatusBar, FlatList, ScrollView } from 'react-native'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { COLORS } from '../../Constant/Colors'


const Notification = ({navigation}) => {    

  const [data, setData] = useState([
    {
      name :'Raj Verma',
      icon : require('../../images/avatar1.png'),
      category: 'Plumber',
      location: 'Noida Sec 40',
      time: '2:13 pm',
      message : 'Deal Completed',
      smallIcon: require('../../images/done.png')
    },
    {
      name :'Raj Verma',
      icon : require('../../images/avatar1.png'),
      category: 'Plumber',
      location: 'Noida Sec 40',
      time: '2:13 pm',
      message : 'Deal Completed',
      smallIcon: require('../../images/done.png')
    },
    {
      name :'Raj Verma',
      icon : require('../../images/avatar1.png'),
      category: 'Plumber',
      location: 'Noida Sec 40',
      time: '2:13 pm',
      message : 'Deal Completed',
      smallIcon: require('../../images/done.png')
    },
  ])
  return (
    <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
          <View style={{ flexDirection: 'row', marginBottom:30 , marginTop:0}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Image source={require('../../images/Notification.png')} style={{  marginLeft: 10, width: 120, height: 32, alignSelf: 'center', resizeMode: 'contain' }} />
          </View>
          <ScrollView>
            <FlatList 
              data={data}
              renderItem={({item})=> (
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, backgroundColor:'#FFF', paddingVertical:14, marginBottom:2}}>
                  <View style={{flexDirection:'row'}}>
                    <Image source={item.icon} style={{width:56, height:56, resizeMode:'contain', alignSelf:'center'}}/>
                    <View style={{marginLeft:12, }}>
                      <Text style={{fontSize:18, color:COLORS.black}}>{item.name}</Text>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{ color:COLORS.orange}}>{item.category}</Text>
                          <Text> • </Text>
                          <Text  style={{ color:COLORS.lightGray}}>{item.location}</Text>
                      </View>
                      <Text style={{color:COLORS.lightGray}}>{item.message}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{color:COLORS.lightGray}}>{item.time}</Text>
                    <Image source={item.smallIcon} style={{width:22, height:22, resizeMode:'contain', alignSelf:'flex-end', marginTop:5}}/>
                  </View>
                </View>
              )}
            />
          </ScrollView>
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
        backgroundColor:'#FFF',
        borderRadius:10
      },
})