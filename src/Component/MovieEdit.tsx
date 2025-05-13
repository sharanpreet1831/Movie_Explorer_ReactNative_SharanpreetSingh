import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

interface MovieData {
    id: string;
    title: string;
    genre: string;
    year: number;
    rating: number;
    director: string;
    duration: number;
    description: string;
    platform: string | null;
    isPremium: boolean;
    poster: string;
    banner: string;
}

interface MovieEditProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    data: MovieData | null;
}

const MovieEdit: React.FC<MovieEditProps> = ({ setModalVisible, data }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [platform, setPlatform] = useState<string | null>(null);
    const [items, setItems] = useState<{ label: string; value: string }[]>([
        { label: 'Amazon', value: 'amazon' },
        { label: 'Netflix', value: 'netflix' },
        { label: 'Hulu', value: 'hulu' },
        { label: 'Disney+', value: 'disney' },
        { label: 'HBO', value: 'hbo' },
    ]);

    const [title, setTitle] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isPremium, setIsPremium] = useState<string>('');
    const [poster, setPoster] = useState<string>('');
    const [banner, setBanner] = useState<string>('');

    useEffect(() => {
        if (data) {
            setTitle(data.title || '');
            setGenre(data.genre || '');
            setYear(data.year?.toString() || '');
            setRating(data.rating?.toString() || '');
            setDirector(data.director || '');
            setDuration(data.duration?.toString() || '');
            setDescription(data.description || '');
            setPlatform(data.platform || null);
            setIsPremium(data.isPremium ? 'Yes' : 'No');
            setPoster(data.poster || '');
            setBanner(data.banner || '');
        }
    }, [data]);

    const handleSave = () => {
        const updatedMovie = {
            id: data?.id,
            title,
            genre,
            year,
            rating,
            director,
            duration,
            description,
            platform,
            isPremium: isPremium.toLowerCase() === 'yes',
            poster,
            banner,
        };
        console.log("Updated movie data:", updatedMovie);
        // TODO: Save this data to backend or state
        setModalVisible(false);
    };

    return (
        <LinearGradient colors={['#051937', '#000000']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.closeButtonContainer}
                    onPress={() => setModalVisible(false)}
                >
                    <Image
                        source={require('../Assests/Image/xmark.circle.png')}
                        style={styles.closeButton}
                    />
                </TouchableOpacity>

                <ScrollView>
                    <View style={styles.InputBox2}>
                        <Text style={styles.BoxHeading}>Id  : {data?.id}</Text>
                    </View>
                    <InputLabel text="Title of movie" />
                    <InputBox value={title} onChangeText={setTitle} placeholder={data?.title} />

                    <InputLabel text="Genre of the movie" />
                    <InputBox value={genre} onChangeText={setGenre} placeholder={data?.genre} />

                    <InputLabel text="Release year of the movie" />
                    <InputBox value={year} onChangeText={setYear} placeholder={data?.year?.toString()} keyboardType="numeric" />

                    <InputLabel text="Rating of the movie (0 to 10)" />
                    <InputBox value={rating} onChangeText={setRating} placeholder={data?.rating?.toString()} keyboardType="decimal-pad" />

                    <InputLabel text="Director of the movie" />
                    <InputBox value={director} onChangeText={setDirector} placeholder={data?.director} />

                    <InputLabel text="Duration of the movie in minutes" />
                    <InputBox value={duration} onChangeText={setDuration} placeholder={data?.duration?.toString()} keyboardType="numeric" />

                    <InputLabel text="Description of the movie (max 1000 characters)" />
                    <InputBox value={description} onChangeText={setDescription} placeholder={data?.description} multiline />

                    <InputLabel text="Streaming platform" />
                    <DropDownPicker
                        open={open}
                        value={platform}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPlatform}
                        setItems={setItems}
                        placeholder="Select a platform"
                        style={styles.dropdown}
                        textStyle={styles.dropdownText}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />

                    <InputLabel text="Whether the movie is premium" />
                    <InputBox value={isPremium} onChangeText={setIsPremium} placeholder="Yes/No" />

                    <InputLabel text="Poster image file (JPEG or PNG)" />
                    <InputBox value={poster} onChangeText={setPoster} placeholder="Poster URL or File Name" />

                    <InputLabel text="Banner image file (JPEG or PNG)" />
                    <InputBox value={banner} onChangeText={setBanner} placeholder="Banner URL or File Name" />

                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Add Movie</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const InputLabel: React.FC<{ text: string }> = ({ text }) => (
    <Text style={styles.BoxHeading}>{text}</Text>
);

const InputBox: React.FC<{
    placeholder: string | undefined;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'numeric' | 'decimal-pad';
    multiline?: boolean;
}> = ({ placeholder, value, onChangeText, keyboardType, multiline }) => (
    <TextInput
        placeholder={placeholder}
        style={styles.InputBox}
        placeholderTextColor="white"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
    />
);

export default MovieEdit;


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
    InputBox2: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 10,
        color: 'white',

    }
})