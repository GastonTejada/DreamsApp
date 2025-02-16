// import * as SQLite from "expo-sqlite";
// //import { openDatabase } from "expo-sqlite";

// const db = SQLite.openDatabase("sessions.db")
// //const db = await SQLite.openDatabaseSync("sessions.db")
// // const db = openDatabase("sessions.db");

// //console.log(db);

// export const initSQLiteDB = () => {
//     console.log("Will create table")
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
//                 [], //Parameters
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     console.log({"will return promise": promise})
//     return promise
// }

// export const insertSession = ({
//     email,
//     localId,
//     token
// }) => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
//                 [localId, email, token], //Parameters
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     return promise
// }

// export const getSession = () => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 'SELECT * from sessions',
//                 [], //Parameters
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     return promise
// }

// /* export const getSessions = ({
//     email,
//     localId,
//     token
// }) => {
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 `INSERT INTO sessions (email, localId, token) VALUES (?, ?, ?)`,
//                 [email, localId, token], //Parameters
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     return promise
// } */

// export const dropSessionsTable = () => {
//     console.log("Will drop table")
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 "DROP TABLE IF EXISTS sessions",
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     console.log("will return promise")
//     return promise
// }

// export const truncateSessionsTable = () => {
//     console.log("Will truncate table")
//     const promise = new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             //Define SQL statement. BEWARE of PARENTHESIS
//             tx.executeSql(
//                 "DELETE FROM sessions",
//                 [], //Parameters
//                 (_, result) => resolve(result), //Resolve trasaction
//                 (_, error) => reject(error) //Transaction error
//             )
//         })
//     })
//     console.log("will return promise")
//     return promise
// }

import * as SQLite from 'expo-sqlite';

// Función para abrir la base de datos de manera asíncrona
const openDatabaseAsync = async () => {
    return await SQLite.openDatabaseAsync('sessions.db');
};

// Inicializa la base de datos y crea la tabla si no existe
export const initSQLiteDB = async () => {
    console.log("Will create table");
    try {        
        const promise = new Promise((resolve, reject) => {

            db.transactionAsync(async tx => {
                await tx.executeSqlAsync(
                    'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);',
                    [],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        console.log({ "will return promise": promise });
        return promise;
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

// Inserta una nueva sesión en la tabla
export const insertSession = async ({ email, localId, token }) => {
    try {
        const db = await openDatabaseAsync();
        const promise = new Promise((resolve, reject) => {
            db.transactionAsync(async tx => {
                await tx.executeSqlAsync(
                    'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
                    [localId, email, token],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        return promise;
    } catch (error) {
        console.error("Error inserting session:", error);
        throw error;
    }
};

// Obtiene todas las sesiones de la tabla
export const getSession = async () => {
    try {
        const db = await openDatabaseAsync();
        const promise = new Promise((resolve, reject) => {
            db.transactionAsync(async tx => {
                await tx.executeSqlAsync(
                    'SELECT * FROM sessions',
                    [],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        return promise;
    } catch (error) {
        console.error("Error getting session:", error);
        throw error;
    }
};

// Elimina la tabla de sesiones si existe
export const dropSessionsTable = async () => {
    console.log("Will drop table");
    try {
        const db = await openDatabaseAsync();
        const promise = new Promise((resolve, reject) => {
            db.transactionAsync(async tx => {
                await tx.executeSqlAsync(
                    'DROP TABLE IF EXISTS sessions',
                    [],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        console.log("will return promise");
        return promise;
    } catch (error) {
        console.error("Error dropping table:", error);
        throw error;
    }
};

// Vacía la tabla de sesiones
export const truncateSessionsTable = async () => {
    console.log("Will truncate table");
    try {
        const db = await openDatabaseAsync();
        const promise = new Promise((resolve, reject) => {
            db.transactionAsync(async tx => {
                await tx.executeSqlAsync(
                    'DELETE FROM sessions',
                    [],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            });
        });
        console.log("will return promise");
        return promise;
    } catch (error) {
        console.error("Error truncating table:", error);
        throw error;
    }
};