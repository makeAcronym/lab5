//Ngô Võ Quang Minh
//MSSV: 21521129
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const CustomBtn = ({text, name}) => {
    return (
        <View style={styles.btnView}>
            {(name == "gallery") ? 
                <FontAwesome name='image' color={"#2196F3"} size={20}/> :
                ((name == "takeImage") ? 
                    <FontAwesome name='camera' color={"#2196F3"} size={20}/> :
                    ((name == "locate" ? 
                        <Ionicons name="location" size={20} color={"#2196F3"}/> :
                        <Feather name='map' size={20} color={"#2196F3"}/>) 
                    )) 
            }
            <Text style={{marginLeft: 10}}>{text}</Text>
        </View>
    );
}
export default CustomBtn;
const styles = StyleSheet.create({
    btnView: {
        borderWidth: 1,
        borderColor: '#2196F3',
        width: 130,
        padding: 5,
        flexDirection: 'row',
    }
});
