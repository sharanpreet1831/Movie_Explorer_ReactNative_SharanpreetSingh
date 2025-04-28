import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Movie from '../Component/Movie';

const HomeScreen = () => {
    const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];
    return (
        <ScrollView>
            <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
                <View style={styles.Header}>
                    <Text style={{ color: 'white', fontSize: 24 }}>Movie Explorer</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>🔍 </Text>
                </View>

                <View style={styles.continueMovieBox}>
                    <ImageBackground resizeMode='cover' source={require("../Assests/Image/MainImage.png")} style={{ width: "100%", height: 320, justifyContent: 'flex-end'  }} >
                    
                        <View style={styles.continueMovieBoxDetail}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'blue', borderRadius: 20, marginHorizontal: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 13, padding: 7 }}>Now Playing </Text>
                                </View>
                                <Text style={{ color: 'white', fontSize: 13 }}>⭐️4.8</Text>
                            </View>

                            <View style={styles.NameofContinueMovie}>
                                <Text style={{ color: 'white', fontSize: 23 }} >Avatar : The Way of Water </Text>
                            </View>
                            <TouchableOpacity style={styles.WatchButton}>
                                <Text style={{ color: 'white', fontSize: 23 }}>Watch Now</Text>
                            </TouchableOpacity>
                        </View>
                        /</ImageBackground>

                </View>
                <View style={{ marginTop: 10, }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {categories.map((category, index) => (
                            <View key={index} style={styles.box}>
                                <Text>{category}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.TrendingMovieBox}>
                    <Text style={{ color: 'white', fontSize: 23 }} > Trending Now  </Text>
                    <ScrollView horizontal={true}>
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                    </ScrollView>
                </View>

                <View style={styles.TrendingMovieBox}>
                    <Text style={{ color: 'white', fontSize: 23 }} > Popular Movies   </Text>
                    <ScrollView horizontal={true}>
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                    </ScrollView>
                </View>
                <View style={styles.TrendingMovieBox}>
                    <Text style={{ color: 'white', fontSize: 23 }} > Coming soon</Text>
                    <ScrollView horizontal={true}>
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                        <Movie />
                    </ScrollView>
                </View>


            </LinearGradient>
        </ScrollView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    Header: {
        marginTop: 60,
        // borderWidth : 1 ,
        // borderColor : 'white',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20

    },
    continueMovieBox: {
        // height: 320,
        width: '100%',
        justifyContent: 'flex-end',
    
        borderRadius : 20,
        overflow : 'hidden'
        
    },
    continueMovieBoxDetail: {

        height: 124,
    },
    NameofContinueMovie: {
        paddingHorizontal: 10
    },
    WatchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 15
    },
    box: {
        width: 80,
        height: 30,
        backgroundColor: 'grey',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40
    },
    TrendingMovieBox: {

        marginTop: 10,


    }
})



// <ImageBackground source={require("../Assests/Image/MainImage.png")}  style= {{ width : 100 , height : 100 }}/>