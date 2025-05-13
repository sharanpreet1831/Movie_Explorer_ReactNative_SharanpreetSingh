import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PlanComponent from '../Component/PlanComponent';
import { Token, useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


interface FeatureCardProps {
  image: any;
  text1: string;
  text2: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ image, text1, text2 }) => (
  <LinearGradient
    colors={['rgba(67, 125, 241, 0.8)', 'rgba(127, 157, 213, 0.8)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.featureCard}
  >
    <Image style={styles.icon} source={image} />
    <Text style={styles.featureText}>{text1}</Text>
    <Text style={styles.featureText}>{text2}</Text>
  </LinearGradient>
);

interface Plan {
  id: string;
  name: string;
  price: string;
}

const SubscriptionScreen: React.FC = () => {
  const [userdata, setUserData] = useState<any | null>(null);
  const [plandata, setPlandata] = useState<Plan[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    };
    loadUserData();
  }, []);

  const features = [
    {
      image: require('../Assests/Image/mutlidevices.webp'),
      text1: 'Multiple Devices',
      text2: 'Watch on any screen',
    },
    {
      image: require('../Assests/Image/xmark.circle.png'),
      text1: 'Offline Access',
      text2: 'Download & watch later',
    },
    {
      image: require('../Assests/Image/sparkles.tv.png'),
      text1: 'HD Streaming',
      text2: 'Crisp video quality',
    },
    {
      image: require('../Assests/Image/exclamationmark.octagon.png'),
      text1: 'Ad-Free',
      text2: 'No interruptions',
    },
  ];

  const navigation = useNavigation();

  const fetchPlans = async () => {
    const url = "http://localhost:3000/Plan";
    const result = await fetch(url);
    const data = await result.json();
    if (data) {
      setPlandata(data);
    } else {
      console.log(data.error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const checkout = async () => {
   try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post('https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions?plan_type=premium',{},{
        headers:{
            Authorization : `Bearer ${token}`
        }
    });
   
   
    navigation.navigate('WebView',{url: response.data.url , session_id :response.data.session_id })
   } catch (error) {
    console.log(error.response);
    
   }
    
    
  };


  return (
    <LinearGradient colors={['#051937', '#000000']} style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.heading}>Choose Your Plan</Text>
          <Text style={styles.subheading}>Unlock premium movies and shows</Text>
        </View>

        <View style={styles.planScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {plandata.map((plan, index) => (
              <TouchableOpacity key={index}>
                <PlanComponent plandata={plan} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              image={item.image}
              text1={item.text1}
              text2={item.text2}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={checkout}
            disabled={userdata?.role === 'supervisor'}
          >
            <LinearGradient
              colors={['rgba(115, 151, 223, 0.8)', 'rgba(103, 140, 234, 0.3)']}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonInner}>
                <Text style={styles.buttonText}>Subscribe</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1.2,
    },
    heading: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    subheading: {
        color: 'grey',
        marginTop: 8,
    },
    planScroll: {
        flex: 6,
        paddingVertical: 10,
       

    },
    featuresContainer: {
        flex: 5.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems :'center'
        

    },
    featureCard: {
        width: 175,
        height: 100,
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: 'white',
    },
    featureText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 4,
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        // borderColor : 'white',
        // borderWidth : 1 
    },
    button: {
        height: 60,
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 15,
        justifyContent: 'center',
    },
    buttonInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});