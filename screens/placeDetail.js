//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PlaceDetail = ({navigation, route}) => {
    const {title, imgUrl, country, city, name, region, street, latitude, longitude} = route.params;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
        });
    },[title])
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: imgUrl}} style={{width: '100%', height: 500}}/>
            <Text style={styles.textDetail}>{name}, {street}, {city}, {region}, {country}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MapView', {latitude: latitude, longitude: longitude})}>
                <View style={styles.btnView}>
                    <FontAwesome name='map' size={20} color={"#2196F3"}/>
                        <Text style={{marginLeft: 10}}>View on Map</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default PlaceDetail;
const styles = StyleSheet.create({
    textDetail: {
        textAlign: 'center', 
        marginVertical: 10, 
        fontWeight: '700', 
        fontSize: 15,
        width: 400        
    },
    btnView: {
        borderWidth: 1,
        borderColor: '#2196F3',
        width: 130,
        padding: 5,
        flexDirection: 'row',
    }
});