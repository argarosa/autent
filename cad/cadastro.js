const {MongoClient} = require('mongodb')

//const fs = require('fs');

//substituir para valores da sua base
const uri ='mongodb+srv://tijolo:1234@cluster0.lejkmrl.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//nome coleção
const COLLECTION_NAME = 'aula';

async function withMongoDb(callback) {
  const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  try {
    await client.connect();
    const db = client.db('aulajs');
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

// mostrar senha
const senhaInput = document.getElementById('senha');
const mostrarSenhaCheckbox = document.getElementById('mostrarSenha');

mostrarSenhaCheckbox.addEventListener('change', function () {
  if (mostrarSenhaCheckbox.checked) {
    senhaInput.type = 'text';
  } else {
    senhaInput.type = 'password';
  }
});