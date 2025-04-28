import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen';
import ExplorerScreen from '../Screen/ExplorerScreen';



const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    // tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: 'black' },
                }}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Explorer" component={ExplorerScreen} />
               

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})