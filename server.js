const {MongoClient} = require('mongodb')

//const fs = require('fs');

//substituir para valores da sua base
const uri = 'mongodb+srv://Teste:12345@gabrielbroto.xh8tyyz.mongodb.net/'

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//nome coleção
const COLLECTION_NAME = 'backup';

async function withMongoDb(callback) {
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    const db = client.db('backup');
    const collection = db.collection(COLLECTION_NAME);
    
    return await callback(collection);
  } catch (error) {
    console.error('Erro ao trabalhar com mongo', error);
    throw error;
  }finally{
    await client.close();
  }
}

async function readData() {
  return withMongoDb(async (collection) => {
    const data = await collection.find({}).toArray();
    return data;
  });
}

async function writeData(data) {
  return withMongoDb(async (collection) => {
    await collection.deleteMany({});
    await collection.insertMany(data);
  });
}

async function findUserByEmail(email) {
  return await withMongoDb(async (collection) => {
    return await collection.findOne({email: email});
  });
}

async function findUserById(id) {
   return await withMongoDb(async (collection) => {
    return await collection.findOne({id: id});
  });
}

module.exports = { readData, findUserByEmail, findUserById, writeData };

