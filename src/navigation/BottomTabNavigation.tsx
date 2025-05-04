import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen';
import ExplorerScreen from '../Screen/ExplorerScreen';
import WachListScreen from '../Screen/WachListScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import SubscriptionScreen from '../Screen/SubscriptionScreen';



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
                <Tab.Screen name="Subscription" component={SubscriptionScreen} />
                <Tab.Screen name="WatchList" component={WachListScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
               

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabNavigation

const styles = StyleSheet.create({})