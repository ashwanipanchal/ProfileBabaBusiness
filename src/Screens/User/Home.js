// import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
// import React from 'react'
// import { COLORS } from '../../Constant/Colors'
// // import PieChart from 'react-native-pie-chart';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from 'react-native-chart-kit'
// import { useFocusEffect } from '@react-navigation/native';
// import { LocalStorage } from '../../services/Api';
// import { BASE_URL } from '../../services/Config';
// const {width} = Dimensions.get('window');

// const Home = ({ navigation }) => {

//   useFocusEffect(()=>{
//     getData()
//   },[])
//   const getData = async() => {
//     const user = (await LocalStorage.getUserDetail() || '')
//         const token = (await LocalStorage.getToken() || '')
//         const newUser = JSON.parse(user)
//         const btoken = `Bearer ${token}`;
//         const response = await fetch(`${BASE_URL}dashboard-api/${newUser.id}`, {
//         // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
//           method: 'GET',
//           headers: {
//             "Accept": "application/json",
//             'Content-Type': 'application/json',
//             "Authorization": btoken,
//           }
//         })
//         const res = await response.json()
//         alert(JSON.stringify(res,null,2))
//   }

//   const pieData = [
//     {
//       name: 'New',
//       population: 20,
//       color: '#FFEC21',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Completed',
//       population: 28,
//       color: '#378AFF',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Follow up',
//       population: 5,
//       color: '#FFA32F',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Not Reachable',
//       population: 8,
//       color: '#F54F52',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Read',
//       population: 11,
//       color: '#93F03B',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//     {
//       name: 'Not Intrested',
//       population: 5,
//       color: '#9552EA',
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     },
//   ];

//   const widthAndHeight = 250
//   const series = [123, 321, 123, 789, 537]
//   const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
//       <View style={{
//         flexDirection: 'row', justifyContent: 'space-between', marginTop: 0, alignItems: 'center', elevation: 0.5, shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.5,
//         shadowRadius: 2,
//       }}>
//         <TouchableOpacity onPress={() => {
//           navigation.openDrawer()
//         }} style={styles.crossImage}>
//           <Image source={require('../../images/homemenu.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
//         </TouchableOpacity>
//         <Image source={require('../../images/homelogo.png')} style={{ width: 129, height: 40, resizeMode: 'contain' }} />
//         <TouchableOpacity onPress={() => { navigation.navigate('Notification') }} style={styles.crossImage}>
//           <Image source={require('../../images/homebell.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
//         </TouchableOpacity>
//       </View>
//       <ScrollView>
//         <View style={{ flexDirection: 'row', marginTop: 10, }}>
//           <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 18, marginLeft: 15, fontWeight: '600' }}>Bikewale.com</Text>
//           {/* <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 18, fontWeight: '600' }}>Bikewale.com</Text> */}
//         </View>
//         <View style={{ height: 100, backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, borderRadius: 10, justifyContent: 'center', elevation:2 }}>
//           <View style={{ backgroundColor: '#FFF', paddingHorizontal: 12 }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Text style={{ color: COLORS.orange, fontSize: 16 }}>Plan Purchased</Text>
//               <Text style={{ color: COLORS.lightBlack }}>No Plan Active</Text>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
//               <Text style={{ color: COLORS.lightBlack }}>Exhausted</Text>
//               <Text style={{ color: COLORS.lightGray }}>100</Text>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
//               <Text style={{ color: COLORS.lightBlack }}>Remaining</Text>
//               <Text style={{ color: COLORS.lightGray }}>100</Text>
//             </View>
//           </View>
//         </View>
//         <View>
//           <Text style={{ color: COLORS.lightGray, fontSize: 18, fontFamily: 'Poppins-SemiBold', marginLeft: 20, marginTop: 5 }}>Lead Action</Text>
//           {/* <View style={{justifyContent:'space-between', alignItems:'center', marginTop:30, elevation:9, flexDirection:'row', marginHorizontal:20}}>
//             <PieChart
//               widthAndHeight={widthAndHeight}
//               series={series}
//               style={{}}
//               sliceColor={sliceColor}
//             />
//             <View style={{}}>
//               <View style={{backgroundColor:'#F44336', height:10, width:70}}></View>
//               <Text style={{alignSelf:'center', marginBottom:5}}>Completed</Text>
//               <View style={{backgroundColor:'#FF9800', height:10, width:70}}></View>
//               <Text style={{alignSelf:'center', marginBottom:5}}>New</Text>
//               <View style={{backgroundColor:'#FFEB3B', height:10, width:70}}></View>
//               <Text style={{alignSelf:'center', marginBottom:5}}>Follow up</Text>
//               <View style={{backgroundColor:'#4CAF50', height:10, width:70}}></View>
//               <Text style={{alignSelf:'center', marginBottom:5}}>Contacted</Text>
//               <View style={{backgroundColor:'#2196F3', height:10, width:70}}></View>
//               <Text style={{alignSelf:'center', marginBottom:5}}>Read</Text>
//             </View>
//           </View> */}
//           <PieChart
//             data={pieData}
//             width={width}
//             height={220}
//             chartConfig={{
//               backgroundColor: '#e26a00',
//               backgroundGradientFrom: '#fb8c00',
//               backgroundGradientTo: '#ffa726',
//               // elevation: 5,
              
//               decimalPlaces: 2, // optional, defaults to 2dp
//               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               style: {
//                 borderRadius: 16,
//                 // elevation:5,
//               }
//             }}
//             bezier
//             style={{
//               marginVertical: 8,
//               borderRadius: 16,
//               // elevation: 2,
//               // backgroundColor:'white',              
//             }}
//             accessor="population"
//             backgroundColor="transparent"
//             paddingLeft="15"
//             absolute
            
//           />
//           <Text style={{color:COLORS.lightGray,marginTop:20, marginLeft:'15%'}}>Total Leads: 100</Text>
//         </View>
//         <View style={{alignItems:'center', marginTop:20}}>
//           <Text style={{color:COLORS.lightGray, fontSize:16}}>You have 7 new leads today and 31 required action.</Text>
//         </View>
//         <View style={{marginVertical:10}}>
//           <Text style={{color:COLORS.lightGray, fontSize:14, marginLeft:15, textDecorationLine:'underline'}}>Today's Offer</Text>
//           <LinearGradient
//             colors={['#F55B54', '#FAAD3A']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={{
//               padding: 10,
//               marginHorizontal: 10,
//               height: 100,
//               borderRadius: 10,
//               marginTop: 10,
//               marginBottom: 10
//             }}>
//             <View style={{ justifyContent: 'space-between', }}>
//               <Text style={{ fontSize: 20, color: '#fff' }}>Get 50 leads for 20% discount.</Text>
//               <View style={{ width: '40%', alignSelf: 'flex-end'}}>
//                 <TouchableOpacity onPress={() => navigation.navigate('ExecutivesNumber')} style={{ justifyContent: 'center', backgroundColor: '#FFF', paddingHorizontal: 10, borderRadius: 8, alignItems: 'center', paddingVertical: 10, marginTop: 10 }}><Text style={{ color: '#F7754C' }}>Get Offer</Text></TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   crossImage: {
//     marginLeft: 20,
//     alignItems: 'center',
//     marginRight: 20,
//     width: '10%',
//     padding: 5,
//     backgroundColor: '#FFF',
//     borderRadius: 10
//   },
// })
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})