


import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
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
  const categories = [
    { id: null, name: 'All' },
    { id: 3, name: 'Action' },
    { id: 12, name: 'Romance' },
    { id: 2, name: 'Comedy' },
    { id: 10, name: 'Drama' },
    { id: 11, name: 'Horror' },
    { id: 4, name: 'Sci-Fi' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PAGE_SIZE = 10;

  const fetchMoviesByGenre = async (genreId: number | null, pageNum = 1) => {
    if (loading || (!hasMore && genreId === null)) return;

    setLoading(true);
    try {
      let url = '';
      let newMovies: MovieType[] = [];

      if (genreId === null) {
       
        url = `https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?page=${pageNum}&per_page=${PAGE_SIZE}`;
        const response = await fetch(url);
        const json = await response.json();
        newMovies = json.movies || [];
        console.log(newMovies);

        setMovies(prev => (pageNum === 1 ? newMovies : [...prev, ...newMovies]));
        setPage(pageNum + 1);

        if (newMovies.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } else {
       
        url = `https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?genre_id=${genreId}`;
        const response = await fetch(url);
        const json = await response.json();
        newMovies = json.movies || [];
        console.log(newMovies);
        

        setMovies(newMovies);
        setPage(2); 
        setHasMore(false); 
      }
    } catch (error: any) {
      console.error('Failed to fetch movies:', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(null, 1);
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#051937', '#000000']} style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.searchBoxwrap}>
          <TextInput
            placeholder="Search"
            style={styles.searchBox}
            placeholderTextColor="black"
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, marginBottom : 8 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log("selected category id ", category.id);

                setPage(1); 
                setSelectedCategory(prev => (prev === category.id ? null : category.id));

                if (category.id === null) {
                  setHasMore(true);
                } else {
                  setHasMore(false);
                }

                fetchMoviesByGenre(category.id, 1);
              }}
            >
              <View
                style={[
                  styles.box,
                  { backgroundColor: selectedCategory === category.id ? 'blue' : 'grey' },
                ]}
              >
                <Text style={{ color: 'white' }}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loading && page === 1 ? (
          <ActivityIndicator testID="loadingIndicator" size="large" color="#fff" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
            renderItem={({ item }) => <Movie key={item.id} data={item} testID="MovieCom" />}
            onEndReached={() => {
              if (selectedCategory === null && hasMore && !loading) {
                fetchMoviesByGenre(null, page);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading && <ActivityIndicator size="small" color="#fff" />}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default ExplorerScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 30,
  },
  searchBoxwrap: {
    marginHorizontal: 20,
    justifyContent: 'center',
    marginBottom: 10,
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
});








