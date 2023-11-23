const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto')
const routes = require('./routes/routes');
const cors = require('cors')


require('dotenv').config();

const mongoString = process.env.DATABASE_URL
console.log(mongoString)
const app = express();
app.use(cors());
app.use('/api', routes)

mongoose.connect(mongoString);
const database = mongoose.connection

app.use(express.json());

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
