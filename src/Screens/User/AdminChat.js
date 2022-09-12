import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import { Api, LocalStorage } from '../../services/Api'
import { BASE_URL } from '../../services/Config';
import moment from 'moment';
import { COLORS } from '../../Constant/Colors';
import Toast from 'react-native-simple-toast';
import Loader from '../../services/Loader';
import { StatusBarDark } from '../../Custom/CustomStatusBar';
import Animated from 'react-native-reanimated';

const AdminChat = ({navigation}) => {
    const [messages, setMessages] = useState([]);
    const [updatedmessages, setUpdatedMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [EachMessages, setEachMessages] = useState('');
    const [userID, setUserID] = useState();

    let flatList = useRef(null);
    useEffect(()=>{
        getAdminChat()
        // setTimeout(() => {
        //   chats.scrollToEnd()
        // }, 50);
      },[])

      const getAdminChat = async () => {
        const user = (await LocalStorage.getUserDetail() || '')
        const token = (await LocalStorage.getToken() || '')
        const newUser = JSON.parse(user)
        setUserID(newUser.id)
        const btoken = `Bearer ${token}`;
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}get-admin-chat/${newUser.id}`, {
        // const response = await fetch(`${BASE_URL}get-chat-history/2`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "Authorization": btoken,
          }
        })
        const res = await response.json()
        const newDate = res.data[0].history.map((i)=>{
          let date = moment(i.created_at).format('DD/MMM/yyyy')
          let time = moment(i.created_at).format('h:mm a');
          
          return {...i, time, date}
        })
        // const rev = newDate.reverse()
        const cc = generateItems(newDate)
        // alert(JSON.stringify(cc,null,2))
        setIsLoading(false)
        setMessages(cc)
        
      }

      const sendChatToAdmin = async() => {
        if(!EachMessages){
          Toast.show("Write your message")
          return
        }
        const body = {
          "user_id":userID,
          "message":EachMessages
         }
         //  return
         const response = await Api.sendchattoadmin(body)
        //  alert(JSON.stringify(response,null,2))
        setEachMessages('')
        const {success} = response
        if(success){
          getAdminChat()
        }else{
          Toast.show("Network Issue")
        }
      }
      function groupedDays(messages) {
        return messages.reduce((acc, el, i) => {
          const messageDay = moment(el.created_at).format('DD-MMM-YYYY');
          if (acc[messageDay]) {
            return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
          }
          return { ...acc, [messageDay]: [el] };
        }, {});
      }
      function generateItems(messages) {
        const days = groupedDays(messages);
        const sortedDays = Object.keys(days).sort(
          (x, y) => moment(y, 'DD-MMM-YYYY').unix() - moment(x, 'DD-MMM-YYYY').unix()
        );
        const items = sortedDays.reduce((acc, date) => {
          const sortedMessages = days[date].sort(
            (x, y) => new Date(y.created_at) - new Date(x.created_at)
          );
          return acc.concat([...sortedMessages, { type: 'day', date, id: date }]);
        }, []);
        return items.reverse();
      }
  return (
    <View style={{flex:1, backgroundColor:'#F5F5F5'}}>
      <StatusBar barStyle="dark-content"  backgroundColor="#F5F5F5"/>
          <View style={{ flexDirection: 'row', marginBottom:20 , marginTop:0, alignItems:'center'}}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                  <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain'  }} />
              </TouchableOpacity>
              <View style={{flexDirection:'row', marginLeft:10}}>
                <Image style={{ width: 48, height: 48 }} source={require('../../images/executive.png')} />
                <View>
                  <Text style={{ color: COLORS.profileBlackText }}>Mr. Kristin Watson</Text>
                  <Text style={{ color: COLORS.lightGray }}>Profile Baba Executive</Text>
                </View>
                {/* <TouchableOpacity onPress={()=> {flatList.current.scrollToEnd({ animated: true })}}>  
                  <Text style={{color:'black'}}>Bottom</Text>
                </TouchableOpacity> */}
              </View>
              {/* <View style={{ flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 0.5, padding: 10 }}>
                <Image style={{ width: 48, height: 48 }} source={require('../../images/executive.png')} />
                <View>
                  <Text style={{ color: COLORS.profileBlackText }}>Mr. Kristin Watson</Text>
                  <Text style={{ color: COLORS.lightGray }}>Profile Baba Executive</Text>
                </View>
              </View> */}
          </View>
        {/* <Loader status={isLoading}/> */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                ref = {flatList}
                // onContentSizeChange={()=> flatList.current.scrollToEnd()}
                onContentSizeChange={() => flatList?.current?.scrollToEnd({animated:true})}
                renderItem={({item})=> (
                    <View>
                    {/* {item.date === item.date? <Text style={{color:'black'}}>Hi</Text> : <Text style={{color:'black'}}>Hello</Text>} */}
                    <View style={{alignItems:'center', }}>
                        {item.type == 'day'? 
                        <Text style={{color:'gray',backgroundColor:'#FFF', padding:5, borderRadius:5}}>{item.date}</Text> :
                        null}
                    </View>
                    {item.type == 'day' ? null : 
                      <View>  
                          {item.sender === 'user'?
                        (
                        <View style={{fontFamily:'Poppins', alignItems:'flex-end',}}>
                            <Text style={{color:'white',  backgroundColor:COLORS.blue, paddingHorizontal:20, paddingVertical:10, marginHorizontal:10, marginVertical:5, borderRadius:10}}>{item.message}</Text>
                            <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                        </View>
                        ) :
                        (
                        <View style={{fontFamily:'Poppins', alignSelf:'flex-start',}}>
                            <Text style={{color:'black',  backgroundColor:'lightgray', paddingHorizontal:20, paddingVertical:10, margin:10, borderRadius:10}}>{item.message}</Text>
                            <Text style={{color:'gray',marginHorizontal:10, fontSize:10}}>{item.time}</Text>
                        </View>
                        )
                    } 
                      </View>}
                     
                    </View>
                )}
                />
        <View style={{ flexDirection: 'row', marginVertical:10, marginHorizontal:10}}>
            <TextInput
             style={styles.textInput}
             value={EachMessages}
              onChangeText={text => setEachMessages(text)} 
              placeholder={'Write your message here...'}
              placeholderTextColor='lightgray'
            ></TextInput>
            <TouchableOpacity onPress={()=>sendChatToAdmin()}>
              <Image source={require('../../images/sendorange.png')} style={{ width: 48, height: 48, marginRight:10 }} />
            </TouchableOpacity>
        </View>  
    </View>
  )
}

export default AdminChat

const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // height:20,
        // backgroundColor:'red'
        padding: 5,
        backgroundColor:'#FFF',
        borderRadius:10
      },
      textInput: {
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        // width: '80%',
        // paddingHorizontal: 15,
        // marginHorizontal: 10,
        // marginTop: 10,
        // position: 'absolute',
        // bottom: 0,
        // marginBottom: 10,
        marginRight:10,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        flex:2,
        backgroundColor: '#fff',
        borderColor: 'grey',
        color: '#000'
      },
})