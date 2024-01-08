//Ngô Võ Quang Minh
//MSSV: 21521129
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceDetail from './placeDetail';
import ViewMap from './mapView';

const Stack = createStackNavigator();

const PlaceDetailMap = ({navigation, route}) => {
    const {title, imgUrl, country, city, name, region, street, latitude, longitude} = route.params;
    return (
        <Stack.Navigator initialRouteName='My Places'>
            <Stack.Screen 
                name="Detail" 
                component={PlaceDetail}
                initialParams={{
                        title: title, 
                        imgUrl: imgUrl, 
                        country: country, 
                        city: city, 
                        name: name, 
                        region: region, 
                        street: street, 
                        latitude: latitude,
                        longitude: longitude
                    }}
            />
            <Stack.Screen 
                name="MapView" 
                component={ViewMap} 
            />
        </Stack.Navigator>
    );
}

export default PlaceDetailMap;