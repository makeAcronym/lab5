//Ngô Võ Quang Minh
//MSSV: 21521129
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomBtn from '../components/customBtn';
import * as LocationGeocoding from 'expo-location';
import * as SQLite from 'expo-sqlite';
import * as Notifications from 'expo-notifications';

const AddNewPlace = ({ navigation, route }) => {
    const [pickLocation, setPickLocation] = useState(null);
    const [optMap, setoptMap] = useState(1);
    const db = SQLite.openDatabase('Place.db');
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [region, setRegion] = useState("");
    const [street, setStreet] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    useEffect(() => {
        if (route.params){
            const {pickedLocation, pickedAddress, image, headerTitle} = route.params; 
            setPickLocation(pickedLocation);
            console.log(pickedAddress);
            setCountry(pickedAddress.country);
            setCity(pickedAddress.city);
            setName(pickedAddress.name);
            setRegion(pickedAddress.region);
            setStreet(pickedAddress.street);
            setLatitude(pickedLocation.latitude);
            setLongitude(pickedLocation.longitude);
            setImage(image);
            setTitle(headerTitle);
            setoptMap(2);
        }
    }, []);
    const handleTitleChange = (text) => {
        setTitle(text);
    }
    const pickImage = async (sourceType) => {
        let result;
        if (sourceType === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else if (sourceType === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const getLocationAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Quyền truy cập vị trí bị từ chối');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            try {
                const address = await LocationGeocoding.reverseGeocodeAsync({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
                setoptMap(1);
                if (address.length > 0) {
                  const firstAddress = address[0];
                  setCountry(firstAddress.country);
                  setCity(firstAddress.city);
                  setName(firstAddress.name);
                  setRegion(firstAddress.region);
                  setStreet(firstAddress.street);
                  setLatitude(location.coords.latitude);
                  setLongitude(location.coords.longitude);
                  console.log('Thông tin địa chỉ:', firstAddress);
                } else {
                  console.log('Không tìm thấy thông tin địa chỉ.');
                }
              } catch (error) {
                console.error('Lỗi khi lấy thông tin địa chỉ:', error);
              }
        } catch (error) {
            console.error('Lỗi khi lấy vị trí:', error);
        }
    };
    const showNotification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
              title: 'Places added successfully',
              body: "The place has been added to your favourite list!",
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
    
    const insertData = () => {
        db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO locations (title, imgUrl, country, city, name, region, street, latitude, longitude) VALUES (?,?,?,?,?,?,?,?,?);',
              [title, image, country, city, name, region, street, latitude, longitude],
              (_, result) => {
                console.log('Item inserted successfully', result);
                navigation.push('My Places');
                showNotification();
              },
              (_, error) => {
                console.error('Error inserting item:', error);
              }
            );
        });
    }
    const handleMapPick = () => {
        navigation.navigate('Map', {img: image, headerTitle: title});
      };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.textTitle}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={(text) => handleTitleChange(text)} />

                {image ?
                    <View style={styles.viewNoti}>
                        <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
                    </View>
                    :
                    <View style={styles.viewNoti}>
                        <Text>No image taken yet.</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.btnSection} onPress={() => pickImage('gallery')} >
                        <CustomBtn text="Pick Image" name="gallery" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSection} onPress={() => pickImage('camera')} >
                        <CustomBtn text="Take Image" name="takeImage" />
                    </TouchableOpacity>
                </View>

                {(optMap == 1) ? (
                    location ?
                    <MapView
                        style={{ flex: 1 , width: '100%', height: 200}}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Vị trí hiện tại"
                        />
                    </MapView>
                    :
                    <View style={styles.viewNoti}>
                        <Text>No location taken yet.</Text>
                    </View>
                ) : (
                    pickLocation ?
                    <MapView
                        style={{ flex: 1 , width: '100%', height: 200}}
                        initialRegion={{
                            latitude: pickLocation.latitude,
                            longitude: pickLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        onPress={navigation.navigate('Add a new Place')}
                        >
                        <Marker
                            coordinate={{
                                latitude: pickLocation.latitude,
                                longitude: pickLocation.longitude,
                            }}
                            title="Vị trí hiện tại"
                        />
                    </MapView>
                    :
                    <View style={styles.viewNoti}>
                        <Text>No location taken yet.</Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.btnSection} onPress={getLocationAsync} >
                        <CustomBtn text="Locate User" name="locate" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSection} onPress={handleMapPick}>
                        <CustomBtn text="Pick on Map" name="pickMap"/>
                    </TouchableOpacity>
                </View>

                <Button title='Add Place' onPress={insertData} />
            </View>
        </ScrollView>
    );
}
export default AddNewPlace;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    btn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    textInput: {
        paddingVertical: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        color: '#424242',
        marginBottom: 10,
    },
    viewNoti: {
        width: '100%',
        height: 200,
        backgroundColor: '#DDDDDD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    },
    btnSection: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});