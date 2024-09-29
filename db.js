require('dotenv').config();

const url = process.env.DB_CONNECTION_STRING;
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

async function connectDB() {
  try {
    await mongoose.connect(); // подключаемся к базе
    console.log('Conneection to DB');
  } catch (error) {
    console.error(error);
  }
}

function getDB() {
  return client.db('todo');
}

module.exports = { connectDB, getDB }