//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useEffect} from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ViewMap = ({navigation, route}) => {
    const {latitude, longitude} = route.params;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Map"
        });
    },[]);
    return (
        <View>
            <MapView
                style={{ flex: 1, width: '100%', minHeight: '100%' }}
                initialRegion={{
                    latitude: latitude, 
                    longitude: longitude, 
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title=""
                />
            </MapView>
    </View>
    );
}

export default ViewMap;