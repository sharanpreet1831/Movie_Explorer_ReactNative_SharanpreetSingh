import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MoiveData from '..//../src/Data/MovieData.json'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieEdit from './MovieEdit'


interface MovieData {
  id: string;
  title: string;
  rating: number;
  poster_url: string;
}

interface MovieProps {
  data: MovieData;
  testID: string;
}

const Movie: React.FC<MovieProps> = ({ data, testID }) => {
  const navigation = useNavigation();
  const [userDetail, setUserDetail] = useState<any>();  
  const [modalVisible, setModalVisible] = useState(false)

  const getdata = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value) {
        setUserDetail(JSON.parse(value))
      } else {
        Alert.alert("User data not found in storage");
      }
    } catch (error) {
      Alert.alert("Failed to load user data");
      console.error(error)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <TouchableOpacity style={styles.mainContainer} testID={testID} onPress={() => navigation.navigate('MovieDetail', { movie: data })}>
      <View style={styles.ImageView}>
        <Image source={{ uri: data?.poster_url }} style={{ width: "100%", height: "100%" }} />
      </View>
      <View style={styles.DescriptionView}>

        <View>
          <Text style={styles.movieTitle} numberOfLines={1}>{data?.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>⭐️ </Text>
            <Text style={styles.movieRating}>{data?.rating}</Text>
          </View>

        </View>

      </View>

      {
        userDetail?.role === "supervisor" && (
          <>
            <TouchableOpacity style={styles.pencilBox} onPress={() => setModalVisible(true)}   testID="pencilBox" >
              <Image source={require('../Assests/Image/pencil.png')} style={styles.pencilImage} />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType='slide'
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
               testID="editModal"

            >
              <MovieEdit setModalVisible={setModalVisible} data={data} />
            </Modal>
          </>
        )}
    </TouchableOpacity>
  )
}

export default Movie;


const styles = StyleSheet.create({
  mainContainer: {
    //  flex : 1 ,
    padding: 10,
    width: 160,
    height: 250,
   
    borderColor: 'grey',
    backgroundColor: 'black',
    borderRadius: 12,
    marginHorizontal: 5,
    maxWidth: '45%',
    marginBottom: 10,
    marginLeft: 5,
    position: 'relative',

  },

  ImageView: {
    marginBottom: 5,
    flex: 6
  },
  DescriptionView: {

    flex: 1,

    justifyContent: 'space-between',
    flexDirection: 'row',


  },
  movieTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '600',
    

  },
  movieRating: {
    color: 'white',
  },
  pencilImage: {
    width: 10,
    height: 10
  },
  pencilBox: {
    backgroundColor: 'blue',
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  }
})