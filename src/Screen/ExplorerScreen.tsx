/* eslint-disable react-native/no-inline-styles */



import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Movie from '../Component/Movie';

interface Genre {
  id: number;
  name: string;
}

interface MovieType {
  id: number;
  title: string;
  genre: Genre;
  [key: string]: any; 
}

const ExplorerScreen: React.FC = () => {
  const categories: string[] = ['All', 'Action', 'Romance', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filteredMovies = selectedCategory && selectedCategory !== 'All'
    ? movies.filter((movie) => movie.genre.name.toLowerCase() === selectedCategory.toLowerCase())
    : movies;

  const fetchMovies = async () => {
    try {
      const url = 'https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?page=1';
      const response = await fetch(url);
      const json = await response.json();
      setMovies(json.movies);
      console.log(json.movies);
    } catch (error: any) {
      console.error('Failed to fetch movies:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <LinearGradient colors={['#051937', '#000000']} style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.searchBoxwrap}>
          <TextInput placeholder="Search" style={styles.searchBox} placeholderTextColor="black" />
        </View>

        <View>
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}} horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedCategory((prev) => (prev === category ? null : category))
                }
                testID={`category-${category}`}
              >
                <View
                  style={[
                    styles.box,
                    {
                      backgroundColor: selectedCategory === category ? 'blue' : 'grey',
                    },
                  ]}
                >
                  <Text style={{ color: 'white' }}>{category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <ActivityIndicator  testID="loadingIndicator" size="large" color="#fff" style={{ marginTop: 50 }} />
        ) : (
          <ScrollView
            contentContainerStyle = {
                {
            flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: 100,
              paddingTop: 20,
              justifyContent: 'space-around'
            }}
          >
            {filteredMovies.map((item) => (
              <Movie key={item.id} data={item} testID="MovieCom" />
            ))}
            <Button title="Load more" onPress={() => {}} />
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
};

export default ExplorerScreen;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 60,


    },
    searchBoxwrap: {

        marginHorizontal: 20,
        justifyContent: 'center',
        marginBottom: 10

    },
    searchBox: {
        paddingHorizontal: 20,
        padding: 10,
        backgroundColor: '#9CA3AF',

        borderRadius: 15,
    },
    box: {
        width: 80,
        height: 30,
        backgroundColor: 'grey',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
})