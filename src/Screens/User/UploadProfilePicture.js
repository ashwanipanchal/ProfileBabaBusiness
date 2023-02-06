import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { ImageBackground } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';

const UploadProfilePicture = ({ navigation, route }) => {
    alert(JSON.stringify(route.params,null,2))
    const onImageOptionHandler = async(type) => {
        const options = {
          title: 'Select and Take Profile Picture',
          cameraType: 'front',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const { uri } = response.assets[0];
            setProfileImage(uri)
            uploadImage()
          }
        });
        // try {
        //   const response = await DocumentPicker.pick({
        //     type: [DocumentPicker.types.images],
        //   })
        //     if(response){
        //       setProfileImage(response)
        //       // uploadImage()
        //     }
        //     setTimeout(()=>{
    
        //       uploadImage()
        //     },3000)
        // } catch (error) {
        //   console.log(error)
        // }
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#E5E5E5" />
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.crossImage}>
                    <Image source={require('../../images/Add.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Image source={require('../../images/youraccount.png')} style={{ marginTop: 0, marginLeft: 10, width: 150, height: 40, resizeMode: 'contain' }} />
            </View>
            {(route.params &&
                <View style={{ marginHorizontal: 20 }}>
                    <ImageBackground imageStyle={{ resizeMode: 'contain', borderRadius: 20 }} style={{ width: '100%', height: 330, resizeMode: 'contain', marginHorizontal: 2, alignSelf: 'center', marginBottom: 10, }} source={route.params.userData.profile_pic.length > 0 ? { uri: `http://testing.profilebaba.com/uploads/users/${userData.profile_pic}` } : require('../../images/default-user-image.png')}>
                        <TouchableOpacity onPress={() => {onImageOptionHandler() }}>
                            <Image source={require('../../images/changeprofilepic.png')} style={{ width: 36, height: 36, position: 'absolute', right: 15, top: 10 }} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            )}
        </SafeAreaView>
    )
}

export default UploadProfilePicture

const styles = StyleSheet.create({
    crossImage: {
        marginTop: 0,
        marginLeft: 20,
        width: '10%',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 10
    },
})