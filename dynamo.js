const AWS = require('aws-sdk');
const config = require('./config/config');
require('dotenv').config();

 AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
 });

const docClient = new AWS.DynamoDB.DocumentClient();

const TABLENAME = 'harry_potter_api'

const getCharacters = async () => {
    const params = {
        TableName: TABLENAME,
    };
    
   const character = await docClient.scan(params).promise();
   return character;
}





const getCharacterById = async (id) => {
  const params = {
    TableName: config.aws_table_name,
    Key: {
      id
    }
  }
  return await docClient.get(params, function (err, data) {
    if (err) {
      console.log(err)
  } else {
      console.log(data);
  }
  }).promise();
}

const addOrUpdateCharacter = async (character) => {
  const params = {
    TableName: config.aws_table_name,
    Item: character
  }
  return await docClient.put(params, function (err, data) {
    if (err) {
      console.log(err)
  } else {
      console.log(data);
  }
  }).promise();
}

const deleteCharacterById = async (id) => {
  const params = {
    TableName: config.aws_table_name,
    Key: {
      id
    }
  }
  return await docClient.delete(params, function (err, data) {
    if (err) {
      console.log(err)
  } else {
      console.log(data);
  }
  }).promise();
}

//addOrUpdateCharacter(hp)

//getCharacters();

module.exports = {
  docClient,
  getCharacterById,
  getCharacters,
  addOrUpdateCharacter,
  deleteCharacterById
}
