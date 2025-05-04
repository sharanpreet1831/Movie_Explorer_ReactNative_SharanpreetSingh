import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MoiveData from '..//../src/Data/MovieData.json'

const Movie = ({data}) => {

  
  return (
    <View style = {styles.mainContainer}>
      <View style = {styles.ImageView}>
        <Image source={{ uri: data?.thumbnail }} style = {{ width :"100%" , height : "100%"}} />
      </View>
      <View style = {styles.DescriptionView}>
        <Text style = {styles.movieTitle}>{data?.title}</Text>
        <View style = {{flexDirection : 'row'}}>
          <Text>⭐️ </Text>
          <Text style = {styles.movieRating}>{data?.rating}</Text>
        </View>
      </View>

    </View>
    
   
  )
}

export default Movie

const styles = StyleSheet.create({
  mainContainer: {
  //  flex : 1 ,
    padding : 10,
    width : 200,
    height : 270,
    borderWidth : 0.2,
    borderColor : 'grey',
    backgroundColor : 'black',
    borderRadius : 12,
    marginHorizontal : 5,
    maxWidth: '45%',
    marginBottom : 10,
    marginLeft : 10
    
  },
  ImageView:{
    marginBottom : 5 , 
    flex : 6
  },
  DescriptionView:{
   
    flex: 1 ,
    
    justifyContent :'center'
   
  },
  movieTitle:{
    color: 'white',
     fontSize: 18,
     marginBottom :5,
     fontWeight :'600',
     
  },
  movieRating:{
    color: 'white',
  }
})