import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import WacthListMovieCom from '../Component/WacthListMovieCom';
import { useFocusEffect } from '@react-navigation/native';



interface Movie {
  id: string;
  title: string;
  status: 'wantToWatch' | 'watched';
}

const WachListScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'wantToWatch' | 'watched' | null>('wantToWatch');
  const [reaload,setReload]=useState(false);
  const [moviesData, setMoviesData] = useState([]);

  const fetchdata = async () => {
    try {
      const url = "https://movie-ror-priyanshu-singh.onrender.com/api/v1/watchlist";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setMoviesData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const removemovie = async (id: string) =>{
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
    }
    setReload(!reaload);

    }
    catch (error) {
      console.error(error);
    }
  }
useFocusEffect(
  React.useCallback(() => {
    fetchdata();
  }, [reaload])
);


  return (
    <View style={{ flex: 1 }} testID="MainView">
      <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
        <View style={{ marginTop: 60 }}>
          <Text style={styles.headingtext}>My WatchList</Text>

         

          <FlatList
            data={moviesData}
            keyExtractor={(item) => item.id}
          
            renderItem={({ item }) => <WacthListMovieCom data= {item}  removemovie={removemovie}/>}
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