const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('Running');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((nt) => nt._id === req.params.id);
  res.send(note);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
