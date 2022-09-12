import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState, useEffect} from 'react'
import { StatusBarDark } from '../../Custom/CustomStatusBar'
import { LocalStorage } from '../../services/Api';
import { BASE_URL } from '../../services/Config';
import { COLORS } from '../../Constant/Colors';
import { RadioButton } from 'react-native-paper';

const SubCategory = ({navigation, route}) => {
    const [category, setCategory] = useState();
    const [state, setState] = useState([{
        selectedIndex:''
    }]);

    useEffect(() => {
        getSubCategory()
    }, [])

    const getSubCategory = async() => {
        const response = await fetch(`${BASE_URL}get-subcategory/${route.params.occupation.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
          }
        })
        const res = await response.json()
        if (res.data) {
            setCategory(res.data)
        }
    }
    if(!category){
        return <View style={{justifyContent:'center', alignItems:'center'}}><Text style={{color:'Black'}}>No Subcategory found</Text></View>
    }
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <StatusBarDark backgroundColor={'#F5F5F5'} />
            <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: StatusBar.currentHeight, alignItems: 'center',}}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                    <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ color: COLORS.blue, fontSize: 22, marginLeft: 10, fontWeight: '600' }}>Select <Text style={{ color: COLORS.orange }}>Sub Category</Text></Text>
            </View>
            <ScrollView>
                <FlatList
                    data={category}
                    renderItem={({ item }) => {
                        const isSelected = state.selectedIndex === item.id ? 'checked' : 'unchecked';
                        return (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                navigation.goBack()
                                route.params.onSelectSubCategory(item)
                                setState({ ...state, selectedIndex: item.id, planAmount: item.amount })
                            }} style={{ marginHorizontal: 20, paddingVertical: 10,borderBottomWidth:0.5, borderColor:'lightgray',flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Image source={{ uri: item.icon }} style={{ width: 28, height: 28 }} />
                                    <Text style={{ color: COLORS.black, marginLeft: 20 }}>{item.title}</Text>
                                </View>
                                <View>
                                    <RadioButton
                                        status={isSelected}
                                        onPress={() => {
                                            navigation.goBack()
                                            route.params.onSelectSubCategory(item)
                                        }}
                                        uncheckedColor={'#FB802A'}
                                        color={'#4285F4'}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </ScrollView>
        </View>
  )
}

export default SubCategory

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