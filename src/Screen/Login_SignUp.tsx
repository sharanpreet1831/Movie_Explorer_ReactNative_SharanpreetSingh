import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Login_SignUp = () => {
    return (

        <LinearGradient style={styles.mainContainer} colors={['#051937', '#000000']}>


            <SafeAreaView style={styles.box}>
                <Text style={styles.Mainheading}>MovieVerse </Text>
                <TextInput
                    placeholder='Email or Username '
                    placeholderTextColor="white"
                    style={styles.BoxStyle}
                />
                <TextInput
                    placeholder='Passwords '
                    placeholderTextColor="white"
                    style={styles.BoxStyle}
                />
                <TouchableOpacity>
                    <LinearGradient style={styles.button} colors={['#000000','#051937']}>

                        <Text style={{ color: "white", fontSize: 18 }}  >
                            Sign In
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.OrBox}>
                    <View style={styles.line}></View>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}>OR</Text>
                    <View style={styles.line}></View>
                </View>
                <TouchableOpacity style={styles.GoogleBox}>
                    <Text style={{ color: "white", fontSize: 17 }} > Sign in with Google </Text>
                </TouchableOpacity>
                <View style={styles.LineForSignup}>
                    <Text style={{ color: "white", fontWeight: '300', fontSize: 15, marginHorizontal: -10 }}>Don't Have an account ?  </Text>
                    <Button

                        title='Sign up '
                    />

                </View>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default Login_SignUp

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "black",
        flex: 1
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    Mainheading: {
        marginTop: 100,
        color: "white",
        fontSize: 32,
        fontWeight: '800',
        margin: 10
    },
    BoxStyle: {
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        width: 342,
        padding: 7,
        marginTop: 15,
        borderRadius: 10

    },
    button: {
        borderWidth: 1,
        borderColor: 'blue',
        height: 50,
        width: 342,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 10

    },
    OrBox: {

        width: 342,
        height: 24,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',


    },
    line: {

        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    GoogleBox: {
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        width: 342,
        padding: 7,
        marginTop: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    LineForSignup: {
        flexDirection: 'row',
        marginTop: 10,
        // borderWidth : 1 ,
        // borderColor : 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


