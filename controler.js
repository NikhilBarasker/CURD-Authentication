import {
    hashPassword,
    comparePassword
} from './helper.js';
import { Connection } from './db.js';
import jwt from 'jsonwebtoken';
import { request, response } from 'express';
export const registerUser = async (request, response) => {
    const user = request.body;
console.log(user);
    try {
      const connection = await Connection();
      const checkEmailQuery = 'SELECT * FROM users WHERE Email = ?';
    const [emailResults] = await connection.execute(checkEmailQuery, [user.Email]);

    if (emailResults.length > 0) {
      connection.end();
      return response.status(400).json({ error: 'Email already exists' });
    }
         const hashedPassword = await hashPassword(user.Password);
        const query = `
            INSERT INTO users (Name, Dob, Gender, Email, Phone, Address, Password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
      
        const [results, fields] = await connection.execute(query, [
            user.Name,
            user.Dob,
            user.Gender,
            user.Email,
            user.Phone,
            user.Address,
            hashedPassword
        ]);
      console.log('hi');
        console.log("User registered successfully:");
        connection.end();
        response.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(`Error occurred while registering the user: ${error}`);
        response.status(500).json({ error: 'Registration failed' });
    }
}
export const loginUser = async (request,response) => {
    const user = request.body
   try {
    const connection = await Connection();
    const query = 'SELECT * FROM users WHERE Email = ?';
    const [results, fields] = await connection.execute(query, [user.Email]);

    if (results.length === 0) {
      connection.end();
      return response.status(401).json({ error: 'User not found' });
    }
    const storedUser = results[0];
       const isPasswordValid = await comparePassword(user.Password, storedUser.password);

    if (isPasswordValid) {
        console.log('User logged in successfully:');
        let token = jwt.sign(
      { email: storedUser.email, id: storedUser.id },
      'qwertyuiop',
      {}
    );
        storedUser.token = token;
      connection.end();
        return response.status(200).json({ message: 'User logged in successfully', user: storedUser.token });
        
    } else {
      connection.end();
      return response.status(401).json({error: 'Invalid credentials'});
    }
  } catch (error) {
    console.error(`Error occurred while logging in: ${error}`);
    response.status(500).json({ error: 'Login failed' });
  }
}

export const fetchUser = async (request,response) => {
  const user = request.body
  console.log('xxxxxxxxxxxxxxxxx',user);
 try {
    const connection = await Connection();
   const query = 'SELECT * FROM users WHERE Email = ?';
   
   const [results, fields] = await connection.execute(query, [user.data.Email]);
   console.log('xxxxxxxxxxxxxxxxx','hi');
    if (results.length === 0) {
      connection.end();
      return response.status(401).json({ error: 'User not found' });
   }
   
    const storedUser = results[0];
       const isPasswordValid = await comparePassword(user.data.Password, storedUser.password);
    if (isPasswordValid) {
        console.log('User logged in successfully');
      connection.end();
        return response.status(200).json({ message: 'User logged in successfully', user: storedUser});
    } else {
      connection.end();
      return response.status(401).json({error: 'Invalid credentials'});
    }
  } catch (error) {
    console.error(`Error occurred while collecting user data in: ${error}`);
    response.status(500).json({ error: 'Login failed' });
  }
}
export const getUser = async (request, response) => {
  const userId = request.params.id;
  try {
    const connection = await Connection();
    const query = 'SELECT * FROM users WHERE id = ?'; // Assuming your user table has a column named 'id'

    const [results, fields] = await connection.execute(query, [userId]);

    if (results.length === 0) {
      connection.end();
      return response.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    connection.end();
    response.status(200).json({ user });
  } catch (error) {
    console.error(`Error occurred while fetching user data: ${error}`);
    response.status(500).json({ error: 'Error fetching user data' });
  }
}
export const editInfo = async (request, response) => {
   const userId = request.params.id; // Extract the user ID from the URL parameter
  const updatedUserData = request.body; // Extract the updated user data from the request body
  // console.log(request.body);
  try {
    const connection = await Connection();
    const query = `
      UPDATE users
      SET Name = ?, Dob = ?, Gender = ?, Email = ?, Phone = ?, Address = ?, Password = ?
      WHERE id = ?
    `;

    const { name, dob, gender, email, phone, address, password } = updatedUserData;
const formattedDob = new Date(dob).toISOString().slice(0, 10);
    const [results, fields] = await connection.execute(query, [
      name,
      formattedDob,
      gender,
      email,
      phone,
      address,
      password,
      userId
    ]);
    if (results.affectedRows === 1) {
      connection.end();
      response.status(200).json(updatedUserData);
    } else {
      connection.end();
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(`Error occurred while updating user data: ${error}`);
    response.status(500).json({ error: 'Error updating user data' });
  }
}

export const deleteUser = async (request, response) => {
  // console.log(request.body);
  const userId = request.params.id; 
  try {
    const connection = await Connection(); // Assuming you have a valid connection to your MySQL database

    const query = 'DELETE FROM users WHERE id = ?'; // Assuming your table name is 'users' and the ID column is 'id'

    const [results, fields] = await connection.execute(query, [userId]);

    if (results.affectedRows === 1) {
      connection.end();
      response.status(204).send(); // Return a 204 status code for successful deletion
    } else {
      connection.end();
      response.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(`Error occurred while deleting user: ${error}`);
    response.status(500).json({ error: 'Error deleting user' });
  }
}

