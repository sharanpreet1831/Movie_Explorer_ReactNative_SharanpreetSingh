


import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Movie from '../Component/Movie';
import MovieData from '../Data/MovieData.json'


const ExplorerScreen = () => {
    const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi'];
    const [selectedCategory, setSelectedCategory] = useState(null);

    const filteredMovies = selectedCategory
    ? MovieData.filter(movie => movie.genre === selectedCategory)
    : MovieData;


    return (
        <LinearGradient colors={['#051937', '#000000']} style = {{flex : 1}} >
            <View style={styles.mainContainer}>


                <View style={styles.searchBoxwrap}>
                    <TextInput placeholder='Search' style={styles.searchBox} placeholderTextColor={"black"} />
                </View>

                <View style={{
                   marginBottom : 10
                   
                }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => 
                                    setSelectedCategory(prev => (prev === category ? null : category))                                }
                            >
                                <View
                                    style={[
                                        styles.box,
                                        {
                                            backgroundColor:
                                                selectedCategory === category ? 'blue' : 'grey',
                                        },
                                    ]}
                                >
                                    <Text style={{ color: 'white' }}>{category}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>
                <ScrollView contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap:'wrap',
                  
                }} >
                     {filteredMovies.map((item) => (
                                <Movie key={item.id} data={item} />
                            ))}
                </ScrollView>

            </View>


        </LinearGradient>
    )
}

export default ExplorerScreen

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 60,
        
       
    },
    searchBoxwrap: {
        
        
        justifyContent : 'center',
        marginBottom : 10

    },
    searchBox: {
        paddingHorizontal: 20,
        padding: 10,
        backgroundColor: '#9CA3AF',
       
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
}) 