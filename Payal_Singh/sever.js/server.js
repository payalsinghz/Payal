import express from 'express';
import cors from 'cors';
imports records from './routes/record .js';

const port = process.env.port||5050;
const app = express();

app.use(cors());

const uri = process.env.ATLAS_urI|| "";
const client 
