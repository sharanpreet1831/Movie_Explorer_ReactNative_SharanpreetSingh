import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'


const ProfileScreen = () => {
    return (
       
            <View style= {styles.mainContainer} testID='MainView' >
                <Text style = {styles.headingText} testId="MainHeading" > Profile </Text>
                <View style = {styles.profileheading}>
                    <View style = {styles.imageView}>
                        <Image source={require("../Assests/Image/Myphoto.jpeg")} style = {{width : 100  , height : 100 , borderRadius : 50 , borderWidth  : 4 , borderColor : 'green'}  } testID='UserImage' />
                    </View>
                    <View style = {styles.UserName} >
                        <Text style= {styles.headingText2} testID='Username'> Sharan </Text>
                        <Text style = {styles.subTitle} testID='Usermail'>Sharan@magicedtech.com</Text>
                    </View>
                </View>

                <TouchableOpacity style = {styles.smallbox}>
                    <View style = {{flexDirection : 'row', alignItems:'center' }} testID='AccountSetting'>
                        <Text style = {styles.emoji}>⚙︎</Text>
                        <Text style = {styles.subTitle2}> Account Setting </Text>
                    </View>
                    <View>
                        <Text style = {styles.emoji2}>˃</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.smallbox} testID='Notification'>
                    <View style = {{flexDirection : 'row', alignItems:'center' }}>
                        <Text style = {[styles.emoji, {fontSize : 20}]}>🔔</Text>
                        <Text style = {styles.subTitle2}> Notification </Text>
                    </View>
                    <View>
                        <Text style = {styles.emoji2}>˃</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.smallbox} testID='Help'>
                    <View style = {{flexDirection : 'row', alignItems:'center' }}>
                        <Text style = {[styles.emoji, {fontSize : 27}]}>？</Text>
                        <Text style = {styles.subTitle2}>Help </Text>
                    </View>
                    <View>
                        <Text style = {styles.emoji2}>˃</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.smallbox} testID='Logout'>
                    <View style = {{flexDirection : 'row', alignItems:'center' }}>
                        <Text style = {[styles.emoji, {fontSize : 20}]}>⌛️</Text>
                        <Text style = {[styles.subTitle2, {color : 'red'}]}> Log Out </Text>
                    </View>
                    <View>
                        <Text style = {styles.emoji2}>˃</Text>
                    </View>
                </TouchableOpacity>

            </View>
       


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderWidth : 1 ,
        backgroundColor : "black"

    },
    headingText:{
        color : 'white',
        marginTop : 60 , 
        fontSize : 26,
        marginLeft : 20,
        fontWeight : '700',
        marginBottom : 10
    },
    profileheading:{
       
        flexDirection : 'row'
        
    },
    imageView:{
        flex : 1 ,
         
        padding : 10
    },
    UserName:{
        flex : 2.5,
       
        justifyContent : 'center'

    },
    headingText2:{
        color : 'white',
       
        fontSize : 26,
        
        fontWeight : '700'
    },
    subTitle:{
        color : 'grey',
        fontSize : 16,
    },
    smallbox:{
        
        borderColor : "red",
        flexDirection : 'row',
        justifyContent :'space-between',
        backgroundColor :'#1a1a1a',
        margin : 7,
        padding : 5,
        borderRadius : 15
       
    },
    emoji:{
        fontSize : 40,
        color: 'white',
        marginLeft : 5
    },
    subTitle2:{
        color : 'white',
        fontSize : 20,
        paddingHorizontal : 10
    },
    emoji2:{
        fontSize : 40,
        color: 'white',
        marginRight : 10,
        alignItems : 'center'
    },
})