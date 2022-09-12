import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image, ScrollView, Linking, Dimensions } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { Api } from '../../services/Api'
import { FlatList } from 'react-native-gesture-handler'
import { useState } from 'react'
import { COLORS } from '../../Constant/Colors'
import Loader from '../../services/Loader'
const {width, height} = Dimensions.get('screen')
const ExecutivesNumber = ({ navigation }) => {
    const [numbers, setNumbers] = useState([])
    const [loading, setLoading] = useState(false)
    useLayoutEffect(()=>{
        getContacts()
    },[])

    const getContacts = async() => {
        setLoading(true)
        const response = await Api.getExecutiveNumber()
        const {success, data} = response;
        setLoading(false)
        if(success){
            setNumbers(data)
            // alert(JSON.stringify(response,null,2))
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <Loader status={loading}/>
            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 0 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                    <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 22, marginLeft: 20, fontWeight: '600' }}>Executive </Text>
                    <Text style={{ color: '#FB802A', fontFamily: 'Poppins-SemiBold', fontSize: 22, fontWeight: '600' }}>Numbers</Text>
                </View>
            </View>
            <Image style={{width:300,height:300, resizeMode:'contain', alignSelf:'center', marginBottom:20,}} source={require('../../images/contactus.jpg')}/>
            <ScrollView>
                    <FlatList
                        data={numbers}
                        renderItem={({item, index})=> (
                            <View style={{backgroundColor:'#FFF', flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginBottom:10, marginHorizontal:20, borderRadius:10, paddingHorizontal:10, height:56}}>
                                <Text style={{color:COLORS.lightBlack, fontSize:18}}>{item.contact_number}</Text>
                                <TouchableOpacity onPress={()=> Linking.openURL(`tel:${numbers[index].contact_number}`)}>
                                    <Image style={{height:32, width:32, resizeMode:'contain', }} source={require('../../images/call.png')}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </ScrollView>
        </SafeAreaView>
    )
}

export default ExecutivesNumber

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
})