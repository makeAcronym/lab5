//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlacesTabScreen from './screens/placeTabScreen';
import Gallery from './screens/galllery';
import initDatabase from './tableSql/dtb';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name='Places' 
          component={PlacesTabScreen}
          options={{
            headerShown: false,
            tabBarStyle: {
              height: 65,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 13,
            },
            tabBarIcon: ({ focused }) => {
              var color = focused ? "#2196F3" : "black";
              return <Ionicons name="location" size={30} color={color}/>
            },
          }}
          />
        <Tab.Screen 
          name='Media' 
          component={Gallery}
          options={{
            headerShown: false,
            tabBarStyle: {
              height: 65,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 13,
            },
            tabBarIcon: ({ focused }) => {
              var color = focused ? "blue" : "black";
              return <MaterialIcons name="perm-media" size={30} color={color}/>
            },
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}