//Ngô Võ Quang Minh
//MSSV: 21521129
import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = ({id, title, imgUrl, country, city, name, region, street}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={{ uri: imgUrl }} style={{marginRight: 10, width: 100, height: 100}}/>
            <View style={{display: 'flex', justifyContent: 'center'}}>
                <Text style={{fontWeight: '700'}}>{title}</Text>
                <Text style={{width: 250}}>{name} ,{street} ,{city} ,{region} ,{country}</Text>
            </View>
        </View>
    );
}
export default Item;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white', 
        marginBottom: 20,
        paddingRight: 20
    }
});
