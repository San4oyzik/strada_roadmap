const url = 'mongodb://localhost:27017/todo'; // урл для сервиса с mongodb
const {MongoClient} = require('mongodb'); // конструктор клиентов mongodb
const client = new MongoClient(url); // создаем новый клиент для работы с базой

async function connectDB() {
  try {
    await   client.connect(); // подключаемся к базе
    console.log('Conneection to DB');
  } catch (error) {
    console.error(error);
  }
}

function getDB() {
  return client.db('todo');
}

module.exports = { connectDB, getDB }