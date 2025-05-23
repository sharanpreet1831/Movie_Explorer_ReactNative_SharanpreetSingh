import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Movie from '../Component/Movie';

function HomeScreen() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation();

    const fetchMovies = async () => {
        try {
            const url = 'https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies?page=1';
            const response = await fetch(url);
            const json = await response.json();
            setMovies(json.movies);
            console.log(json.movies);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <ScrollView>
            <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
                <View style={styles.Header}>
                    <Text style={{ color: 'white', fontSize: 24 }}>Movie Explorer</Text>
                </View>

                <View style={styles.continueMovieBox}>
                    <ImageBackground
                        resizeMode="cover"
                        source={require('../Assests/Image/MainImage.png')}
                        style={{ width: '100%', height: 320, justifyContent: 'flex-end' }}
                        testID="mainImageBackground"
                    >
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={{ position: 'absolute', width: '100%', height: '100%' }}
                        />

                        <View style={styles.continueMovieBoxDetail}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#2563EB', borderRadius: 20, marginHorizontal: 10 }}>
                                    <Text style={{ color: 'white', fontSize: 13, padding: 7 }}>Now Trending</Text>
                                </View>
                                <Text style={{ color: 'white', fontSize: 13 }}>⭐️4.8</Text>
                            </View>

                            <View style={styles.NameofContinueMovie}>
                                <Text style={{ color: 'white', fontSize: 23 }}>Avatar: The Way of Water</Text>
                            </View>

                            <TouchableOpacity style={styles.WatchButton} onPress={() => navigation.navigate('Explorer')}  >
                                <Text style={{ color: 'white', fontSize: 23 }}>Explore More</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>

                <View style={{ flex: 6 }}>
                    <View style={styles.TrendingMovieBox}>
                            <Text style={{ color: 'white', fontSize: 23 }}>Trending Now</Text>
                            <ScrollView horizontal style={{ paddingVertical: 10, marginBottom: 5 }}>
                                {movies.map((item) => (
                                    <Movie key={item.id} data={item} testID="MovieCom" />
                                ))}
                            </ScrollView>
                        </View>

                    <View style={styles.TrendingMovieBox}>
                        <Text style={{ color: 'white', fontSize: 23 }}>Popular Movies</Text>
                        <ScrollView horizontal style={{ paddingVertical: 10, marginBottom: 5 }}>
                            {movies.slice(0).reverse().map((item) => (
                                <Movie key={item.id} data={item} testID="MovieCom" />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.TrendingMovieBox}>
                        <Text style={{ color: 'white', fontSize: 23 }}>Coming soon</Text>
                        <ScrollView horizontal style={{ paddingVertical: 10, marginBottom: 5 }}>
                            {movies.slice(1).map((item) => (
                                <Movie key={item.id} data={item} testID="MovieCom" />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}
import { useNavigation } from '@react-navigation/native';

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    Header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flex: 1
    },
    continueMovieBox: {
        width: '100%',
        justifyContent: 'flex-end',
        flex: 3,
        borderRadius: 20,
        overflow: 'hidden'
    },
    continueMovieBoxDetail: {
        height: 124
    },
    NameofContinueMovie: {
        paddingHorizontal: 10
    },
    WatchButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2563EB',
        padding: 10,
        margin: 10,
        borderRadius: 15
    },
    box: {
        width: 80,
        height: 30,
        backgroundColor: 'grey',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40
    },
    TrendingMovieBox: {}
});

