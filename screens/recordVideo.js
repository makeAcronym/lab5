//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useState, useRef, useEffect } from 'react';
import { Camera} from 'expo-camera'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

const RecordVideo = ({}) => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
    const [hasMediaLibPermission, setHasMediaLibPermission] = useState();
    const [isRecording, setIsRecording] = useState(false);
    const [video, setVideo] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
            const mediaLibPermission = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMicrophonePermission(microphonePermission.status === "granted");
            setHasMediaLibPermission(mediaLibPermission.status === "granted");
        })();
    },[]);

    if (hasCameraPermission === undefined || hasMicrophonePermission === undefined){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Request permissions...</Text>
            </View>
        );
    }else if (!hasCameraPermission){
        return <Text>Permission for camera not granted.</Text>
    }
    const showNotification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
              title: 'Video added successfully',
              body: "The video has been added to your media library!",
            },
            trigger: null,
        });
    };
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    let recordVideo = async () => {
        setIsRecording(true);
        let options = {
            quality: "1080p",
            maxDuration: 60,
            mute: false
        }
        cameraRef.current.recordAsync(options).then((recordVideo) => {
            setVideo(recordVideo);
            setIsRecording(false);
        });
    };

    let stopRecording = () => {
        setIsRecording(false);
        cameraRef.current.stopRecording();
    }
    if (video) {
        let saveVideo = () => {
            MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
                setVideo(undefined);
                showNotification();
            });
        }
        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{uri: video.uri}}
                    useNativeControls
                    resizeMode='stretch'
                    isLooping
                />
                <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={() => setVideo(undefined)}>
                        <Text style={{color: 'white', backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 13, borderRadius: 10, marginRight: 10}}>Re-Record</Text>
                    </TouchableOpacity>
                    {hasMediaLibPermission ? (
                        <TouchableOpacity onPress={saveVideo}>
                            <Text style={{color: 'white', backgroundColor: '#2196F3', paddingVertical: 10, paddingHorizontal: 13, borderRadius: 10}}>Save</Text>
                        </TouchableOpacity>
                    ): undefined}
                </View> 
            </SafeAreaView>
        );
    }
    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                {isRecording ? 
                    <FontAwesome 
                        name="square" size={30} color={"white"} style={{padding: 15, backgroundColor: 'red', borderRadius: 100}} 
                        onPress={stopRecording}/>
                    :
                    <FontAwesome 
                        name="video-camera" size={30} color={"white"} style={{padding: 15, backgroundColor: 'red', borderRadius: 100}} 
                        onPress={recordVideo}/>
                }
            </View>
        </Camera>
    );
}   
export default RecordVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
    }
});
  