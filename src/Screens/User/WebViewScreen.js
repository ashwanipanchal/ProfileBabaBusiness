import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, Image, SafeAreaView, StatusBar,  } from "react-native";
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';


const SCREEN_WIDTH = Dimensions.get("window").width;

const WebViewScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params.title)

    function getTag() {
        return {
            p: { color: '#000' },
            a: { color: '#000', textDecorationLine: 'none' },
            h3: { color: '#000' },
            li: { color: '#000' },
            ul: { color: '#000' },
        }
    }

    return (
        <View style ={{flex:1, backgroundColor:'#f5f5f5'}}>
            <View style={{ flexDirection: 'row', marginBottom: 20, marginTop: 0 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                    <Image source={require('../../images/arrowback.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{ color: '#4285F4', fontFamily: 'Poppins-SemiBold', fontSize: 22, marginLeft: 10, fontWeight: '600' }}>{route.params.title}</Text>
                </View>
            </View>
            <WebView source={{ uri: route.params.url}} />
        </View>
    );
}

export default WebViewScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'#F5f5f5'
    },
    crossImage: {
        marginLeft: 20,
        width: '10%',
        padding: 5,
        // backgroundColor:'red'
        padding: 5,
        // backgroundColor: '#FFF',
        borderRadius: 10
    },
});