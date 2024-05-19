const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, (error, client) => {
  if (error) {
    console.error('Failed to connect to the database. Error:', error);
    return;
  }
  console.log('Connected successfully to server');

  const db = client.db('sample');
  db.createCollection('test', (error, collection) => {
    if (error) {
      console.error('Failed to create collection. Error:', error);
    } else {
      console.log('Collection created successfully');
    }
    client.close();
  });
});
