//Ngô Võ Quang Minh
//MSSV: 21521129
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainGallery from './mainGallery';
import RecordVideo from './recordVideo';

const Stack = createStackNavigator();

const Gallery = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="My Gallery" 
                component={MainGallery}
            />
            <Stack.Screen 
                name="Record Video" 
                component={RecordVideo} 
            />
        </Stack.Navigator>
    );
}

export default Gallery;