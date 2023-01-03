const AWS = require('aws-sdk');
const config = require('./config/config');

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

const getCharacters = async () => {
    const params = {
        TableName: config.aws_table_name
    };

   await docClient.scan(params, function (err, data) {

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


const hp = {
  id: "0",
  name: "Harry Potter",
  alternate_names: [],
  species: "human",
  gender: "male",
  house: "Gryffindor",
  dateOfBirth: "31-07-1980",
  yearOfBirth: "1980",
  wizard: true,
  ancestry: "half-blood",
  eyeColour: "green",
  hairColour: "black",
  wand: {
  wood: "holly",
  core: "phoenix feather",
  length: 11
  },
  patronus: "stag",
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: "Daniel Radcliffe",
  alternate_actors: [],
  alive: true,
  image: "https://ik.imagekit.io/hpapi/harry.jpg"
  }

//addOrUpdateCharacter(hp)

getCharacters();
