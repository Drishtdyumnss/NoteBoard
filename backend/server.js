const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Running');
// });

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

// app.get('/api/notes/:id', (req, res) => {
//   const note = notes.find((nt) => nt._id === req.params.id);
//   res.send(note);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
