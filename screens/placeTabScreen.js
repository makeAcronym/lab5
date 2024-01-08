//Ngô Võ Quang Minh
//MSSV: 21521129
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManagePlaces from './managePlaces';
import AddNewPlace from './addNewPlace';
import Map from './mapScreen';
import PlaceDetailMap from './placeDetailMap';

const Stack = createStackNavigator();

const PlacesTabScreen = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="My Places" 
                component={ManagePlaces}
            />
            <Stack.Screen 
                name="Add a new Place" 
                component={AddNewPlace} 
            />
            <Stack.Screen 
                name="Map" 
                component={Map} 
            />
            <Stack.Screen 
                name="Detail" 
                component={PlaceDetailMap} 
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default PlacesTabScreen;