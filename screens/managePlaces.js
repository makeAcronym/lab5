//Ngô Võ Quang Minh
//MSSV: 21521129
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';
import Item from '../components/item';

const Stack = createStackNavigator();

const ManagePlaces = ({navigation}) => {
    const db = SQLite.openDatabase('Place.db');
    const [rowCount, setRowCount] = useState(0);
    const [items, setItems] = useState([]);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>  (
                <TouchableOpacity onPress={() => navigation.navigate('Add a new Place')}>
                    <AntDesign name="pluscircle" size={30} color={"orange"} style={{marginRight: 20}}/>
                </TouchableOpacity>
            ),
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT COUNT(*) as count FROM locations;', [], (tx, results) => {
              const { rows } = results;
              if (rows.length > 0) {
                const { count } = rows.item(0);
                setRowCount(count);
              } else {
                setRowCount(0);
              }
            });
          });
        fetchItems();
    }, [])
    const selectItems = (callback) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM locations ORDER BY id;', [], (_, result) => {
            const rows = result.rows._array;
            callback(rows);
          });
        });
    };
    const fetchItems = () => {
        selectItems((data) => setItems(data));
    };
    return (
        <View style={styles.container}>
            {(rowCount > 0) ? 
                <FlatList
                    style={{height: 650}}
                    data={items}
                    renderItem={
                        ({item}) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Detail',
                                        {
                                            title: item.title,
                                            imgUrl: item.imgUrl,
                                            country: item.country,
                                            city: item.city,
                                            name: item.name,
                                            region: item.region,
                                            street: item.street,
                                            latitude: item.latitude,
                                            longitude: item.longitude
                                        }
                                    )}
                                >
                                    <Item 
                                        id={item.id} 
                                        title={item.title}
                                        imgUrl={item.imgUrl}
                                        country={item.country}
                                        city={item.city}
                                        name={item.name}
                                        region={item.region}
                                        street={item.street}
                                    /> 
                                </TouchableOpacity>
                            );
                        }}
                    keyExtractor={(item) => item.id}
                />
                : 
                <Text style={styles.textTitle}>No places added yet - start adding some!</Text>}
        </View>
    );
}
export default ManagePlaces;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 25,
    },
    textTitle: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
    }
});