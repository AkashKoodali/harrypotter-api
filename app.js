const express = require("express");
require("dotenv").config();

const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacterById,
} = require("./dynamo");


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});


app.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (e) {
    res.status(500).json({ error: "Somthing went wrong!" });
  }
});

app.get("/characters/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const characters = await getCharacterById(id);
      res.json(characters);
    } catch (e) {
      res.status(500).json({ error: "Somthing went wrong!" });
    }
  });

app.post('/characters', async (req, res) => {
    const character = req.body;

    try {
        const newCharacters = await addOrUpdateCharacter(character);
        res.json(newCharacters);
      } catch (e) {
        res.status(500).json({ error: "Somthing went wrong!" });
      }
});

app.put('/characters/:id', async (req, res) => {
    const character = req.body;
    const { id } = req.params;
    character.id = id;

    try {
        const updateCharacters = await addOrUpdateCharacter(character);
        res.json(updateCharacters);
      } catch (e) {
        res.status(500).json({ error: "Somthing went wrong!" });
      }
});

app.delete('/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await deleteCharacterById(id));
      } catch (e) {
        res.status(500).json({ error: "Somthing went wrong!" });
      }
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
