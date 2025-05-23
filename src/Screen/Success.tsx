import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Success = () => { 
  const navigation = useNavigation()
  return (
    <SafeAreaView style = {styles.mainContainer}>
      <Text style = {styles.textstyle}> Payment Done </Text>
     <Button title='Continue'  onPress={ () => navigation.navigate('Bottom')}/>
    </SafeAreaView>
  )
}

export default Success

const styles = StyleSheet.create({
  mainContainer:{
    flex  : 1,
    justifyContent:'center',
    margin : 10,
    alignItems : 'center'
  },
  textstyle:{
    margin : 10,
    fontSize : 25
  }
})
