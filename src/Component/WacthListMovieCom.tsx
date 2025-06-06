import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';




const WacthListMovieCom = ({data,removemovie}) => {
    return (
        <View style={styles.mainContainer} testID="watchlist-container">
            <View style={styles.box1} testID="poster-placeholder">
                <Image  source={{uri: data.poster_url }}  style={styles.image} />
            </View>
            <View style={styles.box2} testID="details-container">
                <Text style={styles.MovieName} testID="movie-title">{data.title}</Text>
                <View style={{ flexDirection: 'row' }} testID="movie-info">
                    <Text style={styles.MovieYear} testID="movie-year"> {data.release_year}.</Text>
                    <Text style={styles.TimeOfMovie} testID="movie-duration"> {data.duration} min</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }} testID="movie-rating">
                    <Text>⭐️</Text>
                    <Text style={styles.RatingOfMovie} testID="movie-score">{data.rating}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }} testID="remove-button-container">
                    <TouchableOpacity style={styles.RemoveButtonStyle} onPress={()=>removemovie(data.id)}>
                        <Text style={{ color: 'skyblue' }}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


export default WacthListMovieCom

const styles = StyleSheet.create({
    mainContainer: {
        
        height: 144,
        width: "100%",
        flexDirection: 'row'

    },
    box1: {
        backgroundColor : 'grey',
        flex: 1,
        margin: 10,
        borderRadius: 10,
        
    },
    box2: {
       
        flex: 2.7,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15

    },
    MovieName: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    },
    MovieYear: {
        color: 'grey',
        fontSize: 14,
        marginTop: 5
    },
    TimeOfMovie: {
        color: 'grey',
        fontSize: 14,
        marginTop: 5
    },
    RatingOfMovie: {
        color: "white",
        fontSize: 14,
        marginLeft: 10
    },
    RemoveButtonStyle: {
       
       
    },
    image : {
        width :" 100%", 
        height : "100%",
        borderRadius : 10
        
    }
})