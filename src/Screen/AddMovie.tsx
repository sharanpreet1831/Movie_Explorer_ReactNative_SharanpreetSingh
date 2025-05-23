// import React, { useState } from 'react';
// import {
//   Button,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { launchImageLibrary, Asset } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface AddMovieProps {
//   setModalVisible: (visible: boolean) => void;
// }

// interface DropDownOption {
//   label: string;
//   value: string;
// }
// interface InputLabelProps {
//   text: string;
// }

// interface InputBoxProps {
//   placeholder: string;
//   value: string;
//   onChangeText: (text: string) => void;
//   testID?: string;
// }



// const AddMovie: React.FC<AddMovieProps> = ({ setModalVisible }) => {
//   const [open, setOpen] = useState<boolean>(false);
//   const [value, setValue] = useState<string | null>(null);

//   const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
//   const [selectedBanner, setSelectedBanner] = useState<string | null>(null);

//   const [openPremium, setOpenPremium] = useState<boolean>(false);
//   const [openGenre, setOpenGenre] = useState<boolean>(false);
//   const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

//   const [title, setTitle] = useState<string>('');
//   const [releaseYear, setReleaseYear] = useState<string>('');
//   const [rating, setRating] = useState<string>('');
//   const [director, setDirector] = useState<string>('');
//   const [duration, setDuration] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [isPremium, setIsPremium] = useState<string>('');

//   const [items, setItems] = useState<DropDownOption[]>([
//     { label: 'Amazon', value: 'amazon' },
//     { label: 'Netflix', value: 'netflix' },
//     { label: 'Hulu', value: 'hulu' },
//     { label: 'Disney+', value: 'disney' },
//     { label: 'HBO', value: 'hbo' },
//   ]);

//   const premiumOptions: DropDownOption[] = [
//     { label: 'True', value: 'true' },
//     { label: 'False', value: 'false' },
//   ];

//   const [genre, setGenre] = useState<DropDownOption[]>([
//     { label: 'Sci-Fi', value: '4' },
//     { label: 'Horror', value: '11' },
//     { label: 'Action', value: '3' },
//     { label: 'Romance', value: '12' },
//     { label: 'Comedy', value: '2' },
//     { label: 'Documentary', value: '14' },
//     { label: 'Drama', value: '10' },
//     { label: 'Thriller', value: '13' },
//   ]);

//   const choosePosterImage = () => {

//     launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         const asset: Asset = response.assets[0];
//         setSelectedPoster(asset.uri || null);
//       }
//     });
//   };

//   const chooseBannerImage = () => {
//     launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         const asset: Asset = response.assets[0];
//         setSelectedBanner(asset.uri || null);
//       }
//     });
//   };

//   const uploadDocument = async () => {
//     const url = "https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies";
//     const formData = new FormData();

//     formData.append('movie[title]', title);
//     formData.append('movie[genre_id]', selectedGenre || '');
//     formData.append('movie[release_year]', releaseYear);
//     formData.append('movie[rating]', rating);
//     formData.append('movie[director]', director);
//     formData.append('movie[duration]', duration);
//     formData.append('movie[description]', description);
//     formData.append('movie[platform]', value || '');
//     formData.append('movie[is_premium]', isPremium);
//     formData.append('movie[main_lead]', 'main lead');
//     formData.append('movie[streaming_platform]', 'Netflix');

//     // Uncomment if image upload needed
//     if (selectedPoster) {
//       formData.append('movie[poster]', {
//         uri: selectedPoster,
//         name: 'poster.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     if (selectedBanner) {
//       formData.append('movie[banner]', {
//         uri: selectedBanner,
//         name: 'banner.jpg',
//         type: 'image/jpeg',
//       });
//     }

//     try {
//       const token = await AsyncStorage.getItem('token');
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log('Movie added successfully!', result);
//         setModalVisible(false);
//       } else {
//         console.error('Failed to add movie:', result.message || result);
//       }
//     } catch (error) {
//       console.log('Error uploading movie:', error);
//     }
//   };

//   return (
//     <LinearGradient colors={['#051937', '#000000']} style={styles.gradient}>
//       <SafeAreaView style={styles.container}>
//         <TouchableOpacity
//         testID="closeModalButton"
//           style={styles.closeButtonContainer}
//           onPress={() => setModalVisible(false)}
//         >
//           <Image
//             source={require('../Assests/Image/xmark.circle.png')}
//             style={styles.closeButton}
//           />
//         </TouchableOpacity>

//         <ScrollView>
//           <InputLabel text="Title of movie" />
//           <InputBox placeholder="Movie Title" value={title} onChangeText={setTitle} testID="titleInput" />

//           <InputLabel text="Genre of the movie" />
//           <DropDownPicker
//             open={openGenre}
//             value={selectedGenre}
//             items={genre}
//             setOpen={setOpenGenre}
//             setValue={setSelectedGenre}
//             setItems={setGenre}
//             placeholder="Select a genre"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//           />

//           <InputLabel text="Release year of the movie" />
//           <InputBox placeholder="Year" value={releaseYear} onChangeText={setReleaseYear} testID="releaseYearInput" />

//           <InputLabel text="Rating of the movie (0 to 10)" />
//           <InputBox placeholder="Rating" value={rating} onChangeText={setRating}  testID="ratingInput"/>

//           <InputLabel text="Director of the movie" />
//           <InputBox placeholder="Director" value={director} onChangeText={setDirector}  testID="directorInput" />

//           <InputLabel text="Duration of the movie in minutes" />
//           <InputBox placeholder="Duration" value={duration} onChangeText={setDuration} testID="durationInput" />

//           <InputLabel text="Description of the movie" />
//           <InputBox placeholder="Description" value={description} onChangeText={setDescription} testID="descriptionInput" />

//           <InputLabel text="Streaming platform" />
//           <DropDownPicker
//             open={open}
//             value={value}
//             items={items}
//             setOpen={setOpen}
//             setValue={setValue}
//             setItems={setItems}
//             placeholder="Select a platform"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//           />

//           <InputLabel text="Is the movie premium?" />
//           <DropDownPicker
//             open={openPremium}
//             value={isPremium}
//             items={premiumOptions}
//             setOpen={setOpenPremium}
//             setValue={setIsPremium}
//             setItems={() => { }}
//             placeholder="Select true or false"
//             style={styles.dropdown}
//             textStyle={styles.dropdownText}
//             dropDownContainerStyle={styles.dropdownContainer}
//           />

//           <InputLabel text="Poster image file" />
//           <Button title="Choose Image" onPress={choosePosterImage} />
//           {selectedPoster && <Image source={{ uri: selectedPoster }} style={{ width: 100, height: 100, marginTop: 5 }} />}

//           <InputLabel text="Banner image file" />
//           <Button title="Choose Image" onPress={chooseBannerImage} />
//           {selectedBanner && <Image source={{ uri: selectedBanner }} style={{ width: 100, height: 100, marginTop: 5 }} />}

//           <TouchableOpacity style={styles.button} onPress={uploadDocument} testID="addMovieButton">
//             <Text style={styles.buttonText}>Add Movie</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };
import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AddMovieProps {
  setModalVisible: (visible: boolean) => void;
}

interface DropDownOption {
  label: string;
  value: string;
}

interface InputLabelProps {
  text: string;
}

interface InputBoxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  testID?: string;
}

const AddMovie: React.FC<AddMovieProps> = ({ setModalVisible }) => {
  const [openPlatform, setOpenPlatform] = useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const [selectedPoster, setSelectedPoster] = useState<Asset | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<Asset | null>(null);

  const [openPremium, setOpenPremium] = useState<boolean>(false);
  const [openGenre, setOpenGenre] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [title, setTitle] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isPremium, setIsPremium] = useState<string>('');

  const platformOptions: DropDownOption[] = [
    { label: 'Amazon', value: 'amazon' },
    { label: 'Netflix', value: 'netflix' },
    { label: 'Hulu', value: 'hulu' },
    { label: 'Disney+', value: 'disney' },
    { label: 'HBO', value: 'hbo' },
  ];

  const premiumOptions: DropDownOption[] = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  const genreOptions: DropDownOption[] = [
    {
      label: "Thriller",
      value: "13",
    },
    {
      value: "14",
      label: "Documentary"
    },
    {
      value: "11",
      label: "Horror"
    },
    {
      value: "12",
      label: "Romance"
    },
    {
      value: "3",
      label: "Action"
    },
    {
      value: '4',
      label: "Sci-Fi"
    },
    {
      value: "10",
      label: "Drama"
    },
    {
      value: "2",
      label: "Comedy"
    }
  ]

  const chooseImage = async (setImage: React.Dispatch<React.SetStateAction<Asset | null>>) => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const uploadDocument = async () => {
    const url = 'https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies';
    const formData = new FormData();

    formData.append('movie[title]', title);
    formData.append('movie[genre_id]', selectedGenre || '');
    formData.append('movie[release_year]', releaseYear);
    formData.append('movie[rating]', rating);
    formData.append('movie[director]', director);
    formData.append('movie[duration]', duration);
    formData.append('movie[description]', description);
    formData.append('movie[platform]', selectedPlatform || '');
    formData.append('movie[is_premium]', isPremium);
    formData.append('movie[main_lead]', 'main lead');
    formData.append('movie[streaming_platform]', 'Netflix');

    if (selectedPoster) {
      formData.append('movie[poster]', {
        uri: selectedPoster.uri,
        name: selectedPoster.fileName || 'poster.jpg',
        type: selectedPoster.type || 'image/jpeg',
      });
    }

    if (selectedBanner) {
      formData.append('movie[banner]', {
        uri: selectedBanner.uri,
        name: selectedBanner.fileName || 'banner.jpg',
        type: selectedBanner.type || 'image/jpeg',
      });
    }

    try {
      const token = await AsyncStorage.getItem('token');
      console.log(formData)
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('Backend Response:', result);

      if (response.ok) {
        Alert.alert('Success', 'Movie added successfully!');
        setModalVisible(false);
      } else {
        Alert.alert('Error', result.message || 'Failed to add movie');
      }
    } catch (error) {
      console.error('Error uploading movie:', error);
      Alert.alert('Error', 'An error occurred while uploading the movie.');
    }
  };

  return (
    <LinearGradient colors={['#051937', '#000000']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          testID="closeModalButton"
          style={styles.closeButtonContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={require('../Assests/Image/xmark.circle.png')}
            style={styles.closeButton}
          />
        </TouchableOpacity>

        <ScrollView>
          <InputLabel text="Title of movie" />
          <InputBox
            placeholder="Movie Title"
            value={title}
            onChangeText={setTitle}
            testID="titleInput"
          />

          <InputLabel text="Genre of the movie" />
          <DropDownPicker
            open={openGenre}
            value={selectedGenre}
            items={genreOptions}
            setOpen={setOpenGenre}
            setValue={setSelectedGenre}
            setItems={() => { }}
            placeholder="Select a genre"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />

          <InputLabel text="Release year of the movie" />
          <InputBox
            placeholder="Year"
            value={releaseYear}
            onChangeText={setReleaseYear}
            testID="releaseYearInput"
          />

          <InputLabel text="Rating of the movie (0 to 10)" />
          <InputBox
            placeholder="Rating"
            value={rating}
            onChangeText={setRating}
            testID="ratingInput"
          />

          <InputLabel text="Director of the movie" />
          <InputBox
            placeholder="Director"
            value={director}
            onChangeText={setDirector}
            testID="directorInput"
          />

          <InputLabel text="Duration of the movie in minutes" />
          <InputBox
            placeholder="Duration"
            value={duration}
            onChangeText={setDuration}
            testID="durationInput"
          />

          <InputLabel text="Description of the movie" />
          <InputBox
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            testID="descriptionInput"
          />

          <InputLabel text="Streaming platform" />
          <DropDownPicker
            open={openPlatform}
            value={selectedPlatform}
            items={platformOptions}
            setOpen={setOpenPlatform}
            setValue={setSelectedPlatform}
            setItems={() => { }}
            placeholder="Select a platform"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          <InputLabel text="Is the movie premium?" />
          <DropDownPicker
            open={openPremium}
            value={isPremium}
            items={premiumOptions}
            setOpen={setOpenPremium}
            setValue={setIsPremium}
            setItems={() => { }}
            placeholder="Select true or false"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
          />

          <InputLabel text="Poster image file" />
          <Button title="Choose Poster Image" onPress={() => chooseImage(setSelectedPoster)} />
          {selectedPoster && (
            <Image
              source={{ uri: selectedPoster.uri }}
              style={{ width: 100, height: 100, marginTop: 5 }}
            />
          )}

          <InputLabel text="Banner image file" />
          <Button title="Choose Banner Image" onPress={() => chooseImage(setSelectedBanner)} />
          {selectedBanner && (
            <Image
              source={{ uri: selectedBanner.uri }}
              style={{ width: 100, height: 100, marginTop: 5 }}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={uploadDocument} testID="addMovieButton">
            <Text style={styles.buttonText}>Add Movie</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const InputLabel: React.FC<InputLabelProps> = ({ text }) => (
  <Text style={styles.BoxHeading}>{text}</Text>
);


const InputBox: React.FC<InputBoxProps> = ({ placeholder, value, onChangeText, testID }) => (
  <TextInput
    placeholder={placeholder}
    style={styles.InputBox}
    placeholderTextColor="white"
    value={value}
    onChangeText={onChangeText}
    testID={testID}
  />
);

export default AddMovie;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 1,
  },
  closeButton: {
    width: 25,
    height: 25,
    tintColor: 'red',
  },
  BoxHeading: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 6,
  },
  InputBox: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 13,
    marginHorizontal: 10,
    borderRadius: 10,
    color: 'white',
  },
  dropdown: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'white',

    marginTop: 5,
  },
  dropdownText: {
    color: 'white',
  },
  dropdownContainer: {
    backgroundColor: '#051937',
    borderColor: 'white',

  },
  button: {
    backgroundColor: '#1e90ff',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})