import { StyleSheet, Text, View, Dimensions, Image, PermissionsAndroid, Alert, StatusBar } from 'react-native'
import React, { useEffect , useRef} from 'react'
import {  StatusBarLight } from '../Custom/CustomStatusBar';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar'
import { LocalStorage } from '../services/Api';
import { _SetAuthToken } from '../services/ApiSauce';
import Lottie from 'lottie-react-native';
import { COLORS } from '../Constant/Colors';
const { height } = Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import VersionCheck from 'react-native-version-check';

const Splash = ({navigation}) => {
  let notify = 0;
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // PushNotification.localNotification({
      //   message: remoteMessage.notification.body,
      //   title: remoteMessage.notification.title,
      //   bigPictureUrl: remoteMessage.notification.android.imageUrl,
      //   smallIcon: remoteMessage.notification.android.imageUrl,
      // });
      alert(JSON.stringify(remoteMessage))
    });
    return unsubscribe;
  }, []);
  const animationRef = useRef()
  useEffect(()=>{
    checkversion()
    checkPermission()
    
    // navigationHandle()
    // timeForBar()
    setTimeout(()=>{
      animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(0, 100);
    },2000)
  },[])

    const checkversion = async () => {
    const version = await VersionCheck.getCurrentVersion();
    console.log('Got version info:', version);
    if (version.needsUpdate) {
      console.log(`App has a ${version.updateType} update pending.`);
      Alert.alert(
        "Update Require",
        `You have to update to continue using this application.${reg}`,
        [
          {
            text: 'OK',
            onPress: () => Linking.openURL(`https://play.google.com/store/apps/details?id=com.profilebababusiness`),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else {
      console.log(`App has no update.`);
    }
  };

  const checkPermission = async () => {

    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      // downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message:
              'Application needs access to your location to better experience',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          navigationHandle()
          requestUserPermission();
          console.log('Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };

  const navigationHandle = async() => {
    const token = (await LocalStorage.getToken()) || '';
    console.log(token)
    if (token.length !== 0) {
      _SetAuthToken(token);
      navigation.reset({
        index: 0,
        routes: [{name : 'DrawerNavigator'}]
      })
    }else{
        navigation.replace('GetStarted')
    }
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  }

  PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
   
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION 1:", notification);
    alert(JSON.stringify(notification,null,2))
    navigation.navigate('Notification', notification.data );
    // PushNotification.localNotification({
    //     message: notification.body,
    //     title: notification.title,
    //     // bigPictureUrl: notification.android.imageUrl,
    //     // smallIcon: notification.android.imageUrl,
    //   });
  
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION 2:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {

  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

  const getFcmToken = async () => {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        LocalStorage.setFcmToken(fcmToken)
        console.log('-------------fcmToken : ', fcmToken);
      }
    } catch (error) {
      console.log(error, '-------------error');
    }
  };

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image style={styles.image} source={require('../images/logo.png')} />
      {/* <ProgressBar
            progress={0.2}
            width={48}
            height={4}
            color={'#4285F4'}
            animated={true}
            indeterminateAnimationDuration={1000}
            animationType={'timing'}
            style={{
              borderColor: 'rgba(66, 133, 244,0)',
              backgroundColor: 'rgba(66, 133, 244, 0.3)',
              alignSelf: 'center',
              marginTop: 20,
            }}
          /> */}
          <Text style={{color:COLORS.lightBlack, alignSelf:'center', fontSize:28, marginBottom:20}}>Business</Text>
        <Lottie
              ref={animationRef}
              autoplay
              style={{ height:4, alignSelf: 'center'}}
              source={require('../images/progress.json')}
            />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  image: {
    marginTop: height / 4,
    width: '60%',
    height: '35%',
    resizeMode: 'contain',
    alignSelf: 'center',
    // backgroundColor:'red'
  },
})