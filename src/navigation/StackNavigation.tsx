import { } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login_SignUp from '../Screen/Login_SignUp';
import SignUp from '../Screen/SignUp';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileScreen from '../Screen/ProfileScreen';
import MovieDetail from '../Screen/MovieDetail';
import Movie from '../Component/Movie';
import WebViewScreen from '../Screen/WebViewScreen';
import Success from '../Screen/Success';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
        <Stack.Screen name='Login' component={Login_SignUp} />
        <Stack.Screen name='SignUp' component={SignUp}  />
        <Stack.Screen name='Bottom' component={BottomTabNavigation} />
        <Stack.Screen name = 'Profile' component={ProfileScreen} />
        {/* <Stack.Screen name='Movie' component={Movie} /> */}
        <Stack.Screen name='MovieDetail' component={MovieDetail} />
        <Stack.Screen name='WebView' component={WebViewScreen} />
        <Stack.Screen name='Success' component={Success} />
     </Stack.Navigator>

     </NavigationContainer>
   
  )
}

export default StackNavigation

