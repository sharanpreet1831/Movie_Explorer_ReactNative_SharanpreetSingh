import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import WacthListMovieCom from '../Component/WacthListMovieCom';

// Define the type for a Movie
interface Movie {
  id: string;
  title: string;
  status: 'wantToWatch' | 'watched';
}

const WachListScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'wantToWatch' | 'watched' | null>('wantToWatch'); // Default tab

  const handleTabPress = (tab: 'wantToWatch' | 'watched') => {
    setSelectedTab(selectedTab === tab ? null : tab);
  };

  const movies: Movie[] = [
    { id: '1', title: 'Movie 1', status: 'wantToWatch' },
    { id: '2', title: 'Movie 2', status: 'watched' },
    { id: '3', title: 'Movie 3', status: 'wantToWatch' },
    { id: '4', title: 'Movie 4', status: 'watched' },
    { id: '5', title: 'Movie 5', status: 'wantToWatch' },
  ];

  const filteredMovies = selectedTab
    ? movies.filter((movie) => movie.status === selectedTab)
    : movies;

  return (
    <View style={{ flex: 1 }} testID="MainView">
      <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.headingtext}>My WatchList</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[
                styles.buttonWrap,
                { backgroundColor: selectedTab === 'wantToWatch' ? 'blue' : 'gray' },
              ]}
              onPress={() => handleTabPress('wantToWatch')}
            >
              <Text style={styles.buttonText}>Want to Watch</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.buttonWrap,
                { backgroundColor: selectedTab === 'watched' ? 'blue' : 'gray' },
              ]}
              onPress={() => handleTabPress('watched')}
            >
              <Text style={styles.buttonText}>Watched</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id}
            // contentContainerStyle={styles.movieList}
            renderItem={({ item }) => <WacthListMovieCom  />}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default WachListScreen;



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headingtext: {
        color: 'white',
        fontSize: 24,
        fontWeight: "600",
        paddingHorizontal: 10
    },
    buttonWrap: {
        margin: 10,

        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 12,
        width: 180,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
})