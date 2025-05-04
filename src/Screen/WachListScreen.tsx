import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import WacthListMovieCom from '../Component/WacthListMovieCom'

const WachListScreen = () => {
    return (
        <View style = {{     flex : 1 }} sty>
        <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
            <View style={{ marginTop: 60 }}>
                <Text style={styles.headingtext}>My WatchList</Text>
                <View style = {{flexDirection : 'row' , justifyContent : 'space-between'}}>
                    <TouchableOpacity style={styles.buttonWrap}>
                        <Text style={styles.buttonText}>Want to Watch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonWrap}>
                        <Text style={styles.buttonText}>Want to Watch</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style = {{}}>
                <WacthListMovieCom />
                <WacthListMovieCom />
                <WacthListMovieCom />
                <WacthListMovieCom />
                <WacthListMovieCom />
                </ScrollView>
               
            </View>
        </LinearGradient>
        </View>
    )
}

export default WachListScreen

const styles = StyleSheet.create({
    mainContainer: {
    flex : 1 
    },
    headingtext: {
        color: 'white',
        fontSize: 24,
        fontWeight: "600",
        paddingHorizontal: 10
    },
    buttonWrap: {
     margin: 10,
     
        padding : 10 ,
        backgroundColor :  'blue',
        borderRadius : 12,
        width : 180,
        height : 45,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonText: {
        color: 'white',
        fontSize : 16
    }
})