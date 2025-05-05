import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const Login_SignUp = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!emailOrUsername || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        try {
            
            const response = await fetch('https://movie-ror-priyanshu-singh.onrender.com/api/v1/auth/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:{
                        email: emailOrUsername,  // this should match your backend param
                        password: password,
                    }
                })
            });

            const data = await response.json();
            if (!data.error) {
                console.log(data);
                
                Alert.alert("Success", "Logged in successfully");
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Bottom' }],
                });
                
            } else{
                console.log(data);
                Alert.alert("Login Failed")
            }
        } catch (error) {
            Alert.alert("Network Error", error.response);
        }
    };

    return (
        <LinearGradient style={styles.mainContainer} colors={['#051937', '#000000']}>
            <SafeAreaView style={styles.box} testID='LoginScreen'>
                <Text style={styles.Mainheading} testID='MovieVerse'>MovieVerse</Text>

                <TextInput
                    placeholder='Email or Username'
                    placeholderTextColor="white"
                    style={styles.BoxStyle}
                    value={emailOrUsername}
                    onChangeText={setEmailOrUsername}
                    testID="email-input"
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="white"
                    style={styles.BoxStyle}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    testID="password-input"
                />

                <TouchableOpacity style={styles.signbutton} onPress={handleLogin} testID="sign-in-button">
                    <Text style={{ color: "white", fontSize: 18 }}>Sign In</Text>
                </TouchableOpacity>

                <View style={styles.OrBox}>
                    <View style={styles.line}></View>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}>OR</Text>
                    <View style={styles.line}></View>
                </View>

                <TouchableOpacity style={styles.GoogleBox} testID="google-signin-button">
                    <Text style={{ color: "white", fontSize: 17 }}>Sign in with Google</Text>
                </TouchableOpacity>

                <View style={styles.LineForSignup}>
                    <Text style={{ color: "white", fontWeight: '300', fontSize: 15 }}>Don't Have an account?</Text>
                    <Button title='Sign up' onPress={() => navigation.navigate('SignUp')}  testID="signup-button" />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Login_SignUp;
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
        borderRadius: 10,
        color :'white'

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
    },
    signbutton:{
        width : "90%" ,
        height : 50 ,
        backgroundColor : 'blue',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
        borderRadius : 10
        
    }
})


