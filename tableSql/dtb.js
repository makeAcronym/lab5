//Ngô Võ Quang Minh
//MSSV: 21521129
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Place.db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    imgUrl TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT,
    name TEXT,
    region TEXT,
    street TEXT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  );
`;

const initDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(createTableQuery, [], () => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
        );
    });
};

export default initDatabase;