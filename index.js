import express from 'express';
import { Connection } from './db.js';
import Routes from './routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT=8000
const app = express();

app.use(bodyParser.json({extended:true}))
app.use(cors());    
app.use('/', Routes);

Connection();
app.listen(PORT,console.log(`Server is Running at localhost ${PORT}`))