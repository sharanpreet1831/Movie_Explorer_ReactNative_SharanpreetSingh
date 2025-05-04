import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MovieDetail = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageView}>
                <ImageBackground blurRadius={5} source={require("../Assests/Image/image.png")} style={{ width: '100%', height: "100%" }} >
                    <View style={{  margin : 50  , marginTop : 70}}>
                        <Image source={require("../Assests/Image/image.png")} style={{ width: '100%', height: 450 }} />
                    </View>
                </ImageBackground>


            </View>


            <View style={styles.MovieDescription}>
                <View style={styles.MovieNameData}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}> John wick : Chapter 4 </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 5 }}>
                        <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, borderColor: 'white', padding: 5 }}>
                            <Text style={{ color: 'white' }}> Action </Text>
                        </View>
                        <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, borderColor: 'white', padding: 5 }}>
                            <Text style={{ color: 'white' }}> Action </Text>
                        </View>
                        <View style={{ borderWidth: 1, borderRadius: 10, margin: 10, borderColor: 'white', padding: 5 }}>
                            <Text style={{ color: 'white' }}> Action </Text>
                        </View>
                    </View>
                    <Text style={{ color: 'white' }}> NO way back one way out </Text>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text>⭐️</Text>
                    <Text style={{ color: 'white' }}>8.0</Text>
                    <Text style={{ color: 'white', marginLeft: 70, fontWeight: '600' }}> 24 March 2023</Text>
                </View>
                <View style={styles.MovieDes}>
                    <Text style={{ color: 'white', lineHeight: 20 }}>John Wick is a stylish action-thriller about a retired hitman seeking vengeance after gangsters kill his dog—the last gift from his late wife. As he reenters the criminal underworld, his lethal skills resurface. Intense, visually striking, and emotionally driven, the film redefines modern action with relentless pace and choreography.</Text>
                </View>

            </View>
        </View>
    )
}

export default MovieDetail

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

    },
    imageView: {
        flex: 1,
        borderWidth: 1,

    },
    MovieDescription: {
        flex: 1,

        backgroundColor: 'black'

    },
    MovieNameData: {
        borderWidth: 1,
        alignItems: 'center'
    },
    MovieDes: {
        // borderWidth: 1 ,
        // borderColor : 'white',
        marginTop: 10,
        padding: 10,


    }
})