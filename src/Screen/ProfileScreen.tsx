import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddMovie from './AddMovie';
import axios from 'axios';

type UserData = {
  name: string;
  email: string;
  role: string;
  plan_type: string;
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userdata, setUserData] = useState<UserData | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
          console.log('User data loaded:', parsedData); // Log after setting state
        } else {
          console.log('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  const handleOut = () => {

    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
          
            confirmLogout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const confirmLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      if (!token) {
        throw new Error('No token found');
      }
      const res = await axios.delete(
        'https://movie-ror-priyanshu-singh.onrender.com/api/v1/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userData');
        navigation.popToTop();
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      
      console.error('Logout error:', error.response);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer} testID="ProfileScreen">
      {/* Rest of the JSX remains unchanged */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      <Text style={styles.headingText} testID="MainHeading">
        Profile
      </Text>
      <View style={styles.profileheading}>
        <View style={styles.imageView}>
          <Image
            source={require('../Assests/Image/Myphoto.jpeg')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 4,
              borderColor: 'green',
            }}
            testID="UserImage"
          />
        </View>
        <View style={styles.UserName}>
          <Text style={styles.headingText2} testID="Username">
            {userdata?.name || 'Users'}
          </Text>
          <Text style={styles.subTitle} testID="Usermail">
            {userdata?.email || 'email@example.com'}
          </Text>
          <Text style={styles.planType}>
            {userdata?.role === 'supervisor' ? 'Supervisor' : (userdata?.plan_type || 'Free Plan')}
          </Text>
        </View>
      </View>
      {userdata?.role === 'supervisor' && (
        <>
          <TouchableOpacity
            style={styles.smallbox}
            onPress={() => setModalVisible(true)}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center' }}
              testID="AccountSetting"
            >
              <Text style={styles.emoji}> +</Text>
              <Text style={styles.subTitle2}> Add movie </Text>
            </View>
            <View>
              <Text style={styles.emoji2}>˃</Text>
            </View>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <AddMovie setModalVisible={setModalVisible} />
          </Modal>
        </>
      )}
      <TouchableOpacity style={styles.smallbox}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center' }}
          testID="AccountSetting"
        >
          <Text style={styles.emoji}>⚙︎</Text>
          <Text style={styles.subTitle2}> Account Setting </Text>
        </View>
        <View>
          <Text style={styles.emoji2}>˃</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallbox} testID="Notification">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.emoji, { fontSize: 20 }]}>🔔</Text>
          <Text style={styles.subTitle2}> Notification </Text>
        </View>
        <View>
          <Text style={styles.emoji2}>˃</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.smallbox} testID="Help">
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.emoji, { fontSize: 27 }]}>？</Text>
          <Text style={styles.subTitle2}>Help </Text>
        </View>
        <View>
          <Text style={styles.emoji2}>˃</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.smallbox}
        testID="Logout"
        onPress={handleOut}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.emoji, { fontSize: 20 }]}>⌛️</Text>
          <Text style={[styles.subTitle2, { color: 'red' }]}> Log Out </Text>
        </View>
        <View>
          <Text style={styles.emoji2}>˃</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

// Styles remain unchanged
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  headingText: {
    color: 'white',
    marginTop: 20,
    fontSize: 26,
    marginLeft: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  profileheading: {
    flexDirection: 'row',
  },
  imageView: {
    flex: 1,
    padding: 10,
  },
  UserName: {
    flex: 2.5,
    justifyContent: 'center',
  },
  headingText2: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
  },
  subTitle: {
    color: 'grey',
    fontSize: 16,
  },
  smallbox: {
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    margin: 7,
    padding: 5,
    borderRadius: 15,
  },
  emoji: {
    fontSize: 40,
    color: 'white',
    marginLeft: 5,
  },
  subTitle2: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  emoji2: {
    fontSize: 40,
    color: 'white',
    marginRight: 10,
    alignItems: 'center',
  },
  planType: {
    color: 'lightgreen',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});