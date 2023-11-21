import mysql from 'mysql2/promise';

const createSchema = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "nikhil@20",
        });

        // Create the schema (database) if it doesn't exist
        await connection.execute('CREATE DATABASE IF NOT EXISTS task');

        console.log("Schema (database) created successfully");
        connection.end();
    } catch (error) {
        console.error(`Error occurred while creating the schema: ${error}`);
    }
}

export default createSchema;
