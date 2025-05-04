import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

import PlanComponent from '../Component/PlanComponent'

const SubscriptionScreen = () => {
    return (
        <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.Header}>
                    <Text style={styles.heading}>Choose Your Plan </Text>
                    <Text style={styles.subheading}>Unlock premium movie and shows </Text>
                </View>
                <View style={styles.box2}>

                    <ScrollView horizontal={true}>
                        <PlanComponent />
                        <PlanComponent />
                        <PlanComponent />
                    </ScrollView>
                </View>

                <View style={styles.box3}>

                    <LinearGradient
                        colors={['rgba(169, 189, 229, 0.8)', 'rgba(29, 75, 160, 0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.smallbox}
                    >
                        <Image style={styles.imagestyling} source={require('../Assests/Image/mutlidevices.webp')} />
                        <Text style={styles.smallText}>Multiple Devices</Text>
                        <Text style={styles.smallText}>Watch on any screen</Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['rgba(169, 189, 229, 0.8)', 'rgba(29, 75, 160, 0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.smallbox}
                    >
                        <Image style={styles.imagestyling} source={require('../Assests/Image/mutlidevices.webp')} />
                        <Text style={styles.smallText}>Multiple Devices</Text>
                        <Text style={styles.smallText}>Watch on any screen</Text>
                    </LinearGradient>


                    <LinearGradient
                        colors={['rgba(169, 189, 229, 0.8)', 'rgba(29, 75, 160, 0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.smallbox}
                    >
                        <Image style={styles.imagestyling} source={require('../Assests/Image/mutlidevices.webp')} />
                        <Text style={styles.smallText}>Multiple Devices</Text>
                        <Text style={styles.smallText}>Watch on any screen</Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['rgba(169, 189, 229, 0.8)', 'rgba(29, 75, 160, 0.8)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.smallbox}
                    >
                        <Image style={styles.imagestyling} source={require('../Assests/Image/mutlidevices.webp')} />
                        <Text style={styles.smallText}>Multiple Devices</Text>
                        <Text style={styles.smallText}>Watch on any screen</Text>
                    </LinearGradient>

                   


                </View>
                <View style={styles.box4}>
                    
                    <TouchableOpacity style = {{ height : 50    }}>
                    <LinearGradient
                        colors={['rgba(110, 145, 217, 0.8)', 'rgba(237, 239, 244, 0.3)']}
                        style={{ flex : 1 , borderRadius : 15, marginBottom : 5 }}
                    >
                           <View style = {{flex : 1  , justifyContent : 'center' , alignItems : 'center'}}>
                           <Text style={styles.smallText2}>Start free trial</Text>
                           </View>
                        
                        </LinearGradient>
                        </TouchableOpacity>


                </View>
            </SafeAreaView>

        </LinearGradient>
    )
}

export default SubscriptionScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    Header: {
        
        padding: 10,
        paddingHorizontal: 20,
        flex: 1.2

    },
    heading: {
        fontSize: 24,
        color: 'white'
    },
    subheading: {
        color: 'grey',
        marginTop: 10
    },
    box2: {
        flex: 6,
       
    },
    box3: {
        flex: 5,
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    imagestyling: {
        width: 25,
        height: 25,
        color: 'white',


    },
    // smallbox: {
    //     backgroundColor: '#2563EB',
    //     width: 160,
    //     height: 100,
    //     borderRadius: 20,
    //     paddingVertical: 10,
    //     paddingHorizontal: 5,
    //     margin: 10
    // }
    smallbox: {
        width: 150,
        height: 90,
        borderRadius: 15,


        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    smallText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
    },
    buttonwrap: {
        borderWidth: 1,
        borderColor: 'white'
    },
    box4: {
        flex: 1,
       
       
    },
    smallText2:{
        color : 'white',
        fontSize :20,
        
    }


})