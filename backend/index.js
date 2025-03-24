import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import pageRouter from './router-controller/router.js';
import db from './connection.js'; 

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.once('open', () => console.log('Connected to db'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', pageRouter);

app.get('/', (_, res) => {
  res.send('Greetings from the backend!!');
});

// 📌 **New Route: Serve jobs.json**
app.get('/api/jobs', (req, res) => {
    const filePath = path.join(process.cwd(), 'dummy_info', 'jobs.json'); // Ensure correct path
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to load jobs data' });
        }
        res.json(JSON.parse(data));
    });
});

// 🛑 Handle incorrect routes
app.all('/users', (req, res) => res.status(405).send("ERROR:--Method not implemented"));
app.all('/', (req, res) => res.status(405).send("ERROR:--Method not implemented"));
app.all('*', (req, res) => res.status(400).send("ERROR:--Invalid path"));

const port = process.env.PORT || '3000'; 
app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}`));


