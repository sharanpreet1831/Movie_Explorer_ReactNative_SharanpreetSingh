import { Image, StyleSheet} from 'react-native'
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
                  screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: 'black' },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconSource;

                        switch (route.name) {
                            case 'Home':
                                iconSource = require('../Assests/Image/house.png');
                                break;
                            case 'Explorer':
                                iconSource = require('../Assests/Image/globe.png');
                                break;
                            case 'Subscription':
                                iconSource = require('../Assests/Image/creditcard.png'); 
                                break;
                            case 'WatchList':
                                iconSource = require('../Assests/Image/bookmark.png');
                                break;
                            case 'Profile':
                                iconSource = require('../Assests/Image/person.crop.circle.fill.png'); 
                                break;
                            default:
                                iconSource = require('../Assests/Image/house.png');
                        }

                        return (
                            <Image
                                source={iconSource}
                                style={{
                                    width: focused ? 20 : 20,
                                    height: focused ? 20 : 20,
                                    tintColor: color,
                                }}
                            />
                        );
                    },
                })}
                >
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

