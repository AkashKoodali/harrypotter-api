const axios = require('axios');
const {addOrUpdateCharacter} = require('./dynamo');

const seedData = async () => {
    const url = 'https://hp-api.onrender.com/api/characters';
    try {
        const {data : character} = await axios.get(url);

        const characterPromises = character.map((char, i) => {
          addOrUpdateCharacter({...char, id: i + ''})
        })
        await Promise.all(characterPromises);
    } catch (e) {
      console.error(e);  
    }
}
seedData();