//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

const MainGallery = ({navigation}) => {
    const [media, setMedia] = useState([]);
    useEffect(() => {   
        navigation.setOptions({
            headerRight: () =>  (
                <TouchableOpacity onPress={() => navigation.navigate('Record Video')}>
                    <FontAwesome name="video-camera" size={30} color={"orange"} style={{marginRight: 20}}/>
                </TouchableOpacity>
            ),
        });

        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
      
            if (status === 'granted') {
              const mediaAssets = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.all, 
                sortBy: [[MediaLibrary.SortBy.creationTime, false]],
              });
      
              setMedia(mediaAssets.assets);
            }
        })();
    },[media]);
    return (
        <View style={styles.container}>
            <FlatList
                data={media}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.mediaItem}>
                    {item.mediaType === 'photo' ? (
                    <Image source={{ uri: item.uri }} style={styles.image} />
                    ) : (
                        <Video
                            style={styles.video}
                            source={{uri: item.uri}}
                            useNativeControls
                            resizeMode='stretch'
                            isLooping
                        />
                    )}
                </View>
                )}
                numColumns={2}
            />
        </View>
    );
}

export default MainGallery;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    mediaItem: {
        flex: 1,
        margin: 8,
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 8,
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
    }
});
  