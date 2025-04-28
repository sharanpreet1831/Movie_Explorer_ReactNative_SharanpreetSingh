import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Movie from '../Component/Movie';


const ExplorerScreen = () => {
    const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];
    return (
        <LinearGradient colors={['#051937', '#000000']} style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.searchBoxwrap}>
                    <TextInput placeholder='Search' style={styles.searchBox} placeholderTextColor={"black"} />
                </View>

                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {categories.map((category, index) => (
                            <View key={index} style={styles.box}>
                                <Text>{category}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>


                <ScrollView contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                    <Movie />
                </ScrollView>


            </View>
        </LinearGradient>
    )
}

export default ExplorerScreen

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 60
    },
    searchBoxwrap: {

    },
    searchBox: {
        paddingHorizontal: 20,
        padding: 10 ,
        backgroundColor: '#9CA3AF',
        margin: 15,
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
})