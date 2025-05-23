import React, { useEffect } from 'react'

import StackNavigation from './src/navigation/StackNavigation'

import { StripeProvider } from '@stripe/stripe-react-native'


import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid} from 'react-native';

const App = () => {
  
  useEffect(() => {
    requestNotificationPermissionAndroid();
  }, []);

  const requestNotificationPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFCMToken();
    } else {
      console.log('Notification permission denied');
    }
  };

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (error) {
      console.error('Error retrieving FCM token:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification?.title, remoteMessage.notification?.body);
    });

    return unsubscribe;
  }, []);


  return (
   <StackNavigation  />
    
  );
};

export default App;

