import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import WacthListMovieCom from '../Component/WacthListMovieCom'

const WachListScreen = () => {
    const [selectedTab, setSelectedTab] = useState(null);

  const handleTabPress = (tab) => {
    if (selectedTab === tab) {
      setSelectedTab(null); // Deselect if same tab is clicked
    } else {
      setSelectedTab(tab); // Select new tab
    }
  };
    return (
        <View style={{ flex: 1 }}>
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
  
            <ScrollView>
              <WacthListMovieCom />
              <WacthListMovieCom />
              <WacthListMovieCom />
              <WacthListMovieCom />
              <WacthListMovieCom />
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    )
}

export default WachListScreen

const styles = StyleSheet.create({
    mainContainer: {
    flex : 1 
    },
    headingtext: {
        color: 'white',
        fontSize: 24,
        fontWeight: "600",
        paddingHorizontal: 10
    },
    buttonWrap: {
     margin: 10,
     
        padding : 10 ,
        backgroundColor :  'blue',
        borderRadius : 12,
        width : 180,
        height : 45,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonText: {
        color: 'white',
        fontSize : 16
    }
})