import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Movie {
  id: number;
  title: string;
  poster_url: string;
  genre: { name: string };
  director: string;
  rating: string;
  release_year: string;
  description: string;
}

interface RouteParams {
  movie: Movie;
}

const MovieDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { movie } = route.params as RouteParams;

  const addwatchlist =  async(id: string) => {
   try {
      const url = `https://movie-ror-priyanshu-singh.onrender.com/api/v1/watchlist/${id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
         body: JSON.stringify({ id }),

      });
       if (!response.ok) {
      throw new Error(`Failed to remove movie with id: ${id}`);
     
    } else {
        Alert.alert("Movie Added to Watchlist");
      }
   

    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.mainContainer} testID="MovieDetailScreen">
      <View style={styles.imageView}>
        <ImageBackground
          blurRadius={5}
          source={{ uri: movie.poster_url }}
          style={styles.backgroundImage}
          testID="BlurredBackground"
        >
          <TouchableOpacity
            style={styles.backbuttonWrapper}
        
            onPress={() => {
              navigation.goBack()
            } 
              
            }
          >
            <Image
              source={require('../Assests/Image/chevron.backward.png')}
              style={styles.backbutton}
            />
          </TouchableOpacity>

          <View style={styles.mainImageWrapper}>
            <Image
              source={{ uri: movie.poster_url }}
              style={styles.mainImage}
              testID="MainMovieImage"
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.movieDescription}>
        <View style={styles.movieNameData}>
          <Text style={styles.movieTitle} testID="MovieTitle">
            {movie.title}
          </Text>

          <View style={styles.genreRow}>
            <View style={styles.genreTag}>
              <Text style={styles.genreText} testID="GenreTags">
                {movie.genre?.name}
              </Text>
              
            </View>
            <TouchableOpacity onPress={() =>{
              addwatchlist(movie.id)
            }}>
              <Image source={require('../Assests/Image/bookmark.png')} style = {{marginLeft : 150, width : 50, height : 40 , resizeMode : 'contain'}} />
            </TouchableOpacity>
            
          </View>

          <Text style={styles.director} testID="Moviedirector">
            Director: {movie.director}
          </Text>
        </View>

        <View style={styles.ratingRow} testID="RatingAndReleaseDate">
          <Text>⭐️</Text>
          <Text style={styles.rating} testID="MovieRating">
            {movie.rating}
          </Text>
          <Text style={styles.releaseDate} testID="ReleaseDate">
            {movie.release_year}
          </Text>
        </View>

        <View style={styles.descriptionWrapper} testID="MovieDescriptionText">
          <Text style={styles.descriptionText}>{movie.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default MovieDetail;


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageView: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  mainImageWrapper: {
    margin: 50,
    marginTop: 70,
    zIndex : 1
  },
  mainImage: {
    width: '100%',
    height: 450,
  },
  movieDescription: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  movieNameData: {
    alignItems: 'center',
  },
  movieTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginTop : 90
  },
  genreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    
    width : '100%'
  },
  genreTag: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  genreText: {
    color: 'white',
  },
  director: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    gap: 10,
  },
  rating: {
    color: 'white',
    marginLeft: 5,
  },
  releaseDate: {
    color: 'white',
    marginLeft: 40,
    fontWeight: '600',
  },
  descriptionWrapper: {
    marginTop: 10,
    padding: 10,
  },
  descriptionText: {
    color: 'white',
    lineHeight: 20,
  },
  backbuttonWrapper: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    padding: 10,
    // borderWidth : 1,
    // borderColor : 'white'
  },
  
  backbutton: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});