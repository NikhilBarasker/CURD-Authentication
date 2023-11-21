
import mysql from 'mysql2/promise';
import createSchema from './Schema.js';

export const Connection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "nikhil@20",
        });

        // Create the schema (database) if it doesn't exist
        await createSchema();

        // Use the "task" schema (database)
        await connection.query('USE task');

        // Create the "users" table with specific fields
        await connection.execute(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) ,
            dob VARCHAR(15) ,
            gender VARCHAR(10) ,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(15) ,
            city TEXT,
            password VARCHAR(255) NOT NULL
        )`);

        console.log("Database Connected Successfully");
        return connection;
    } catch (error) {
        console.log(`Error occurred while connecting to the database: ${error}`);
        throw error;
    }
}
