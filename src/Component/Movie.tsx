import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Movie = () => {
  return (
  
        <ImageBackground
  source={require('../Assests/Image/MovieImage.png')} 
  style={styles.mainContainer}
  resizeMode= "cover"
  >
      <Text style={{ color: 'white', fontSize: 23 }} >Movie</Text>
      <Text style={{ color: 'white', fontSize: 23 }}> ⭐️ 4.5</Text>
      </ImageBackground>
  
    // </View>
  )
}

export default Movie

const styles = StyleSheet.create({
    mainContainer:{
        
        width : 80 , 
        height : 190 ,
        marginHorizontal : 10,
        marginTop : 20,
        borderRadius : 15,
        justifyContent:'flex-end',
        overflow : 'hidden'
    }
})