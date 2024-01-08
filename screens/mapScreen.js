//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';

const Map = ({navigation, route}) => {
    const {img, headerTitle} = route.params;
    const [pickedLocation, setPickedLocation] = useState(null);
    const [pickedAddress, setPickedAddress] = useState(null);
    const [title, settitle] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>  (
                <TouchableOpacity onPress={() => handleSave()}>
                    <Ionicons name="save" size={30} color={"black"} style={{marginRight: 20}}/>
                </TouchableOpacity>
            ),
        });
    },[pickedLocation, pickedAddress]);
    const handleMapPress = async (event) => {
        try {
            const { coordinate } = event.nativeEvent;
            setPickedLocation(coordinate);

            const addressResult = await Location.reverseGeocodeAsync({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            });

            if (addressResult.length > 0) {
                const firstAddress = addressResult[0];
                setPickedAddress(firstAddress);
                settitle(
                    `${firstAddress.name}, ${firstAddress.street}, ${firstAddress.region}, ${firstAddress.city}, ${firstAddress.country}`
                );
            }
        } catch (error) {
            console.error("Error handling map press:", error);
        }
    };
    const handleSave = () => {
        if (pickedLocation && pickedLocation.latitude && pickedLocation.longitude) {
          navigation.push('Add a new Place', {
            pickedLocation: pickedLocation,
            pickedAddress: pickedAddress,
            image: img,
            headerTitle: headerTitle
          });
        } else {
          console.warn('No location selected.');
        }
      };
    return (
        <View>
            <MapView
                style={{ flex: 1, width: '100%', minHeight: '100%' }}
                initialRegion={{
                    latitude: 10.82302, 
                    longitude: 106.62965, 
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
            >
                {pickedLocation && pickedLocation.latitude && pickedLocation.longitude && (
                    <Marker
                        coordinate={{
                            latitude: pickedLocation.latitude,
                            longitude: pickedLocation.longitude,
                        }}
                        title={title}
                    />
                )}
            </MapView>
    </View>
    );
}

export default Map;