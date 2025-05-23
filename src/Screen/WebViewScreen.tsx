import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { Axios } from 'axios'




const WebViewScreen = () => {
    const {params} = useRoute();

    const {url , session_id}:any = params;

    const navigation = useNavigation();
    
    const handlePaymentSuccessfulPayment = async (session_id) => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions/success?session_id=${session_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response; 
      } catch (error) {
        console.error('Payment success error:', error.response?.data || error.message);
        throw error; 
      }
    };


    const handleNavigationChange = async(navState:any)=>{
       
        
        if(navState.url.includes('success')){
          console.log(navState)
          console.log("succes")
          const res = await handlePaymentSuccessfulPayment(session_id)
          console.log(res);
          if(res.status ===  200){
            navigation.navigate('Success');
          }
          
        }
    }


  return (
    <View style={{flex:1}}>
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationChange}
      />

    </View>
  )
}

export default WebViewScreen

const styles = StyleSheet.create({})