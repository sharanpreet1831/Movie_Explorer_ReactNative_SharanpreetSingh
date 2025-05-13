import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from 'react-native';
  import React, { useState } from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  
  const SignUp = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
  
    const handleSignUp = async () => {
      if (!username || !email || !password || !confirmPassword || !phoneNumber) {
        Alert.alert('Error', 'All fields are required');
        return;
      }
  
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      try {
        const response = await fetch('https://movie-ror-priyanshu-singh.onrender.com/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              name: username,
              email,
              password,
              password_confirmation: confirmPassword,
              phone_number: phoneNumber
            }
          })
        });
  
        const data = await response.json();
  
        if (data.user) {
          Alert.alert('Success', 'Account created successfully');
        } else {
          Alert.alert('Signup failed');
        }
      } catch (error) {
        console.log('Signup error:', error);
        Alert.alert('Error', 'Something went wrong');
      }
    };
  
    return (
      <LinearGradient style={styles.mainContainer} colors={['#051937', '#000000']}>
        <SafeAreaView style={styles.ViewOfFields} testID="SignUpScreen">
          <Text style={styles.Mainheading}>MovieVerse</Text>
  
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={styles.BoxStyle}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={styles.BoxStyle}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={styles.BoxStyle}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="white"
            style={styles.BoxStyle}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="white"
            style={styles.BoxStyle}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
  
          <TouchableOpacity style={styles.signbutton} onPress={handleSignUp}>
            <Text style={{ color: 'white', fontSize: 18 }}>Sign In</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
  export default SignUp;
  

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    ViewOfFields: {
        justifyContent: 'center',
        alignItems: 'center'
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
        color: "white"

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
    signbutton: {
        width: "90%",
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10

    }
})



// priyanshu's api  :  https://movie-ror-priyanshu-singh.onrender.com/api/v1/auth/sign_up