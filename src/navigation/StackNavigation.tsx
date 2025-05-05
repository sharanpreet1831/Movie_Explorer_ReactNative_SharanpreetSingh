import { } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login_SignUp from '../Screen/Login_SignUp';
import SignUp from '../Screen/SignUp';
import BottomTabNavigation from './BottomTabNavigation';
import ProfileScreen from '../Screen/ProfileScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
        <Stack.Screen name='Login' component={Login_SignUp} />
        <Stack.Screen name='SignUp' component={SignUp}  />
        <Stack.Screen name='Bottom' component={BottomTabNavigation} />
        <Stack.Screen name = 'Profile' component={ProfileScreen} />
     </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

