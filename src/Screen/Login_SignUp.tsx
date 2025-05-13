import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from 'react-native';
  import React, { useState,useEffect } from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
  
  
  type RootStackParamList = {
    Bottom: undefined;
    SignUp: undefined;
  };
  
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  
  const Login_SignUp = () => {
    const [emailOrUsername, setEmailOrUsername] = useState<string>('a@gmail.com');
    const [password, setPassword] = useState<string>('123456789');
    const [secure, setSecure] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [logged, setLogged] = useState(false);
  
    const navigation = useNavigation<NavigationProp>();

    useEffect(()=>{
      const fetchUser = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
        if(token){
          const res = await axios.get('https://movie-ror-priyanshu-singh.onrender.com/api/v1/profile',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

          const user = res.data.user;
          console.log(user);
          

          await AsyncStorage.setItem('userData', JSON.stringify(user));

          if(user.email){
            navigation.navigate('Bottom');
          }
          
        }
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser();
    },[logged])
    
  
    const handleLogin = async (): Promise<void> => {
      if (!emailOrUsername || !password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      setIsLoading(true);
  
      try {
        const response = await fetch('https://movie-ror-priyanshu-singh.onrender.com/api/v1/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: {
              email: emailOrUsername,
              password: password,
            }
          })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          await AsyncStorage.setItem('token', data.auth_info.access_token.token);
          Alert.alert("Success", "Logged in successfully");
  
          setLogged(!logged);
        } else {
          Alert.alert("Login Failed", data.message || "Invalid credentials");
        }
      } catch (error) {
        console.log("Fetch error:", error);
        Alert.alert("Network Error", "Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <LinearGradient style={styles.mainContainer} colors={['#051937', '#000000']}>
        <SafeAreaView style={styles.box} testID='LoginScreen'>
          {isLoading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="lightblue" />
            </View>
          )}
  
          <View style={styles.logoContainer}>
            <Image
              source={require('../Assests/Image/logo3-removebg-preview.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.Mainheading} testID='MovieVerse'>MovieVerse</Text>
          </View>
  
          <TextInput
            placeholder='Email or Username'
            placeholderTextColor="white"
            style={styles.BoxStyle}
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            testID="email-input"
          />
  
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder='Password'
              placeholderTextColor="white"
              style={styles.passwordInput}
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
              testID="password-input"
            />
            <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeIconContainer} testID="eye-icon-button" >
              <Image
                source={require('../Assests/Image/eye.png')}
                style={[styles.eyeIcon, { tintColor: 'white' }]}
              />
            </TouchableOpacity>
          </View>
  
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
            <Button title='Sign up' onPress={() => navigation.navigate('SignUp')} testID="signup-button" />
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
        fontSize: 25,
        fontWeight: '800',
        marginTop: 10,
        
        marginLeft : -40
    
    },
    BoxStyle: {
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        width: 342,
        padding: 7,
        marginTop: 15,
        borderRadius: 10,
        color: 'white'

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
    signbutton: {
        width: "90%",
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10

    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        height: 50,
        width: 342,
        paddingHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
    },
    passwordInput: {
        flex: 1,
        color: 'white',
    },
    eyeIconContainer: {
        padding: 5,
    },
    eyeIcon: {
        width: 25,
        height: 16,
    },
    logo:{
        width: 200,
        height:100,
        
    },
    logoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
       marginTop : 100,
       marginLeft : -90,
       marginBottom : 20
       
        
    },
    loaderOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
})



// priyanshu's api :  https://movie-ror-priyanshu-singh.onrender.com/api/v1/auth/sign_in
